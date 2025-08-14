import React, { RefObject, useEffect, useMemo, useRef, useState } from "react";

import * as d3 from "d3";
import {
	motion,
	SpringOptions,
	useAnimationFrame,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
	useVelocity,
} from "motion/react";

// Credit:
// https://www.fancycomponents.dev/docs/components/blocks/marquee-along-svg-path

type MarqueeAlongPathProps = {
	children: React.ReactNode;
	path: string;
	baseVelocity: number;
	repeat?: number;
	zIndexBase?: number;
	enableRollingZIndex?: boolean;
	scrollContainerRef: React.RefObject<HTMLDivElement | null>;
};

type MarqueeItemProps = {
	baseOffset: any;
	itemIndex: number;
	totalItems: number;
	repeatIndex: number;
	zIndexBase: number;
	scaledPath: string;
	isHovered: React.MutableRefObject<boolean>;
	children: React.ReactNode;
};

/**
 * Wraps a number between a min and max value
 * @param min The minimum value
 * @param max The maximum value
 * @param value The value to wrap
 * @returns The wrapped value between min and max
 */
const wrap = (min: number, max: number, value: number): number => {
	const range = max - min;
	return ((((value - min) % range) + range) % range) + min;
};

type PreserveAspectRatioAlign =
	| "none"
	| "xMinYMin"
	| "xMidYMin"
	| "xMaxYMin"
	| "xMinYMid"
	| "xMidYMid"
	| "xMaxYMid"
	| "xMinYMax"
	| "xMidYMax"
	| "xMaxYMax";

interface CSSVariableInterpolation {
	property: string;
	from: number | string;
	to: number | string;
}

type PreserveAspectRatioMeetOrSlice = "meet" | "slice";

type PreserveAspectRatio =
	| PreserveAspectRatioAlign
	| `${Exclude<
			PreserveAspectRatioAlign,
			"none"
	  >} ${PreserveAspectRatioMeetOrSlice}`;

interface MarqueeAlongSvgPathProps {
	children: React.ReactNode;
	className?: string;

	// Path properties
	path: string;
	pathId?: string;
	preserveAspectRatio?: PreserveAspectRatio;
	showPath?: boolean;

	// SVG properties
	width?: string | number;
	height?: string | number;
	viewBox?: string;

	// Marquee properties
	baseVelocity?: number;
	direction?: "normal" | "reverse";
	easing?: (value: number) => number;
	slowdownOnHover?: boolean;
	slowDownFactor?: number;
	slowDownSpringConfig?: SpringOptions;

	// Scroll properties
	useScrollVelocity?: boolean;
	scrollAwareDirection?: boolean;
	scrollSpringConfig?: SpringOptions;
	scrollContainer?: RefObject<HTMLElement> | HTMLElement | null;

	// Item repetition
	repeat?: number;

	// Drag properties
	draggable?: boolean;
	dragSensitivity?: number;
	dragVelocityDecay?: number;
	dragAwareDirection?: boolean;
	grabCursor?: boolean;

	// Z-index properties
	enableRollingZIndex?: boolean;
	zIndexBase?: number;
	zIndexRange?: number;

	cssVariableInterpolation?: CSSVariableInterpolation[];
}

/**
 * Parse SVG path string into coordinate points using D3
 * This extracts the actual coordinates from the path for scaling
 */
const parsePathToPoints = (
	pathString: string,
	maxSamples: number = 100
): Array<[number, number]> => {
	const points: Array<[number, number]> = [];

	// Create a temporary SVG element to parse the path
	const svg = d3.create("svg");
	const path = svg.append("path").attr("d", pathString);

	// Sample points along the path
	const pathNode = path.node() as SVGPathElement;
	if (pathNode) {
		const totalLength = pathNode.getTotalLength();

		// If the path is too long, sample only a subset of points. Majes
		const numSamples = Math.min(maxSamples, totalLength);

		for (let i = 0; i <= numSamples; i++) {
			const point = pathNode.getPointAtLength(
				(i / numSamples) * totalLength
			);
			points.push([point.x, point.y]);
		}
	}

	return points;
};

/**
 * Create a scaled path using D3's line generator
 * This is the approach recommended in the CSS-Tricks article
 */
const createScaledPath = (
	originalPath: string,
	originalWidth: number,
	originalHeight: number,
	newWidth: number,
	newHeight: number
): string => {
	// Parse the original path into points
	const points = parsePathToPoints(originalPath);

	// Create scales for X and Y coordinates
	const xScale = d3
		.scaleLinear()
		.domain([0, originalWidth])
		.range([0, newWidth]);

	const yScale = d3
		.scaleLinear()
		.domain([0, originalHeight])
		.range([0, newHeight]);

	// Scale the points
	const scaledPoints = points.map(
		([x, y]) => [xScale(x), yScale(y)] as [number, number]
	);

	// Create a smooth curve using D3's line generator
	const line = d3
		.line()
		.x((d) => d[0])
		.y((d) => d[1])
		.curve(d3.curveBasis); // Use basis curve for smooth interpolation

	return line(scaledPoints) || "";
};

const MarqueeItem = ({
	baseOffset,
	itemIndex,
	totalItems,
	repeatIndex,
	zIndexBase,
	scaledPath,
	isHovered,
	children,
}: MarqueeItemProps) => {
	const itemOffset = useTransform(baseOffset, (v: number) => {
		const position = (itemIndex * 100) / totalItems;
		const wrappedValue = wrap(0, 100, v + position);
		return `${wrappedValue}%`;
	});

	const zIndex = useTransform(itemOffset, (v) => {
		const progress = parseFloat(v.replace("%", ""));
		return Math.floor(zIndexBase + progress);
	});

	const opacity = useTransform(itemOffset, (v) => {
		const progress = parseFloat(v.replace("%", "")) / 100;
		const x = 2 * progress - 1;
		return Math.pow(1 - Math.pow(Math.abs(x), 10), 2);
	});

	return (
		<motion.div
			className="marquee-item absolute top-0 left-0"
			style={{
				offsetPath: `path('${scaledPath}')`,
				offsetDistance: itemOffset,
				offsetRotate: "auto",
				zIndex: zIndex,
				opacity: opacity,
			}}
			aria-hidden={repeatIndex > 0}
			onMouseEnter={() => (isHovered.current = true)}
			onMouseLeave={() => (isHovered.current = false)}
		>
			{children}
		</motion.div>
	);
};

const MarqueeAlongPath = ({
	children,
	path,
	scrollContainerRef,
	pathId,
	preserveAspectRatio = "xMidYMid meet",
	showPath = false,

	// SVG defaults
	width = "100%",
	height = "100%",
	viewBox = "0 0 200 1000",

	// Marquee defaults
	baseVelocity = 5,
	direction = "normal",
	easing,
	slowdownOnHover = false,
	slowDownFactor = 0.3,
	slowDownSpringConfig = { damping: 50, stiffness: 400 },

	// Scroll defaults
	useScrollVelocity = false,
	scrollAwareDirection = false,
	scrollSpringConfig = { damping: 50, stiffness: 400 },
	scrollContainer,

	// Items repetition
	repeat = 3,

	// Drag defaults
	draggable = false,
	dragSensitivity = 0.2,
	dragVelocityDecay = 0.96,
	dragAwareDirection = false,
	grabCursor = false,

	// Z-index defaults
	enableRollingZIndex = true,
	zIndexBase = 1, // Base z-index value
	zIndexRange = 10, // Range of z-index values to use

	cssVariableInterpolation = [],
}: MarqueeAlongPathProps) => {
	const baseOffset = useMotionValue(0);

	const springConfig = {
		stiffness: 100,
		damping: 20,
	};

	const smoothScrollVelocity = useSpring(scrollVelocity, springConfig);

	const scrollVelocityFactor = useTransform(
		smoothScrollVelocity,
		[0, 1000],
		[0, 5],
		{ clamp: false }
	);

	const items = useMemo(() => {
		const childrenArray = React.Children.toArray(children);

		return childrenArray.flatMap((child, childIndex) =>
			Array.from({ length: repeat }, (_, repeatIndex) => {
				const itemIndex = repeatIndex * childrenArray.length + childIndex;
				const key = `${childIndex}-${repeatIndex}`;
				return {
					child,
					childIndex,
					repeatIndex,
					itemIndex,
					key,
				};
			})
		);
	}, [children, repeat]);

	const currentOffsetDistance = useMotionValue(0);

	// Function to calculate z-index based on offset distance
	const calculateZIndex = useCallback(
		(offsetDistance: number) => {
			if (!enableRollingZIndex) {
				return undefined;
			}

			// Simple progress-based z-index
			const normalizedDistance = offsetDistance / 100;
			return Math.floor(zIndexBase + normalizedDistance * zIndexRange);
		},
		[enableRollingZIndex, zIndexBase, zIndexRange]
	);

	// Generate a random ID for the path if not provided
	const id =
		pathId || `marquee-path-${Math.random().toString(36).substring(7)}`;

	// Scroll tracking
	const { scrollY } = useScroll({
		container: (scrollContainer as RefObject<HTMLDivElement>) || container,
	});

	const scrollVelocity = useVelocity(scrollY);
	const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig);

	// Hover and drag state tracking
	const isHovered = useRef(false);
	const isDragging = useRef(false);
	const dragVelocity = useRef(0);

	// Direction factor for changing direction based on scroll or drag
	const directionFactor = useRef(direction === "normal" ? 1 : -1);

	// Motion values for animation
	const hoverFactorValue = useMotionValue(1);
	const defaultVelocity = useMotionValue(1);
	const smoothHoverFactor = useSpring(hoverFactorValue, slowDownSpringConfig);

	// Transform scroll velocity into a factor that affects marquee speed
	const velocityFactor = useTransform(
		useScrollVelocity ? smoothVelocity : defaultVelocity,
		[0, 1000],
		[0, 5],
		{ clamp: false }
	);
	useAnimationFrame((_, delta) => {
		if (isHovered.current) {
			hoverFactorValue.set(0.3);
		} else {
			hoverFactorValue.set(1);
		}

		let moveBy =
			((baseVelocity * delta) / 1000) *
			directionFactor.current *
			smoothHoverFactor.get();

		if (scrollVelocityFactor.get() < 0) {
			directionFactor.current = -1;
		} else if (scrollVelocityFactor.get() > 0) {
			directionFactor.current = 1;
		}

		moveBy += directionFactor.current * moveBy * scrollVelocityFactor.get();

		baseOffset.set(baseOffset.get() + moveBy);
	});

	const wrapperRef = useRef<HTMLDivElement>(null);

	// Toggle between scaling methods: 1 or 2
	const [useScaleMethod] = useState<1 | 2>(1);

	// Scale method #1
	const marqueeContainerRef = useRef<HTMLDivElement>(null);
	// Original SVG dimensions
	const originalWidth = 800;
	const originalHeight = 400;

	useEffect(() => {
		if (useScaleMethod === 1) {
			// Scale method #1: CSS transform scale
			const updateScale = () => {
				const wrapper = wrapperRef.current;
				const marqueeContainer = marqueeContainerRef.current;
				if (!wrapper || !marqueeContainer) return;

				const scale = wrapper.clientWidth / originalWidth;
				marqueeContainer.style.transform = `scale(${scale})`;
				marqueeContainer.style.transformOrigin = "top left";
			};

			updateScale();
			window.addEventListener("resize", updateScale);
			return () => window.removeEventListener("resize", updateScale);
		}
	}, []);

	// Scale method #2 with D3
	const [scaledPath, setScaledPath] = useState(path);
	const [currentViewBox, setCurrentViewBox] = useState(
		`0 0 ${originalWidth} ${originalHeight}`
	);

	useEffect(() => {
		if (useScaleMethod === 2) {
			// Scale method #2: D3 path scaling
			const updatePath = () => {
				const wrapper = wrapperRef.current;
				if (!wrapper) return;

				const containerWidth = wrapper.clientWidth;
				const containerHeight = wrapper.clientHeight;

				// Use D3 to create the scaled path
				const newPath = createScaledPath(
					path,
					originalWidth,
					originalHeight,
					containerWidth,
					containerHeight
				);

				setScaledPath(newPath);
				setCurrentViewBox(`0 0 ${containerWidth} ${containerHeight}`);
			};

			updatePath();
			window.addEventListener("resize", updatePath);
			return () => window.removeEventListener("resize", updatePath);
		}
	}, [path]);

	return (
		<div
			className="container w-full relative aspect-[588/187] overflow-x-hidden overflow-y-visible"
			ref={wrapperRef}
		>
			<svg
				width="100%"
				height="100%"
				viewBox={currentViewBox}
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path d={scaledPath} stroke="white" fill="none" />
			</svg>
			<div
				className="marquee-container absolute top-0 left-0 w-full h-full"
				ref={marqueeContainerRef}
			>
				{items.map(({ child, repeatIndex, itemIndex, key }) => (
					<MarqueeItem
						key={key}
						baseOffset={baseOffset}
						itemIndex={itemIndex}
						totalItems={items.length}
						repeatIndex={repeatIndex}
						zIndexBase={zIndexBase}
						scaledPath={scaledPath}
						isHovered={isHovered}
					>
						{child}
					</MarqueeItem>
				))}
			</div>
		</div>
	);
};

export default MarqueeAlongPath;
