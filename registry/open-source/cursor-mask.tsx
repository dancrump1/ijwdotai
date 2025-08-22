"use client";

import type React from "react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import { useHover } from "@/lib/hover-context";
import { useMousePosition } from "@/registry/utilities/elasticLinePosition";
import { motion, useMotionValue, useTransform } from "motion/react";
import { twMerge } from "tailwind-merge";

// Credit:
// https://auraui.vercel.app/component/mask-cursor

interface MaskCursorProps {
	children: ReactNode;
	hoverColor?: string;
	maskColor?: string;
	className?: string;
	hovered?: string;
}
const MaskCursor: React.FC<MaskCursorProps> = ({
	children,
	className,
	hoverColor,
	maskColor = "#A5FECB",
	hovered,
}) => {
	const { x, y } = useMousePosition();

	const { hovering } = useHover();

	const maskX = useMotionValue(0);
	const maskY = useMotionValue(0);
	const [svgSize, setSvgSize] = useState(500);
	let size = hovering ? 5000 : 500;

	// Reference to the container to calculate offsets
	const containerRef = useRef<HTMLDivElement>(null);

	// Update mask position when the mouse moves
	useEffect(() => {
		if (containerRef.current) {
			const containerRect = containerRef.current.getBoundingClientRect();
			maskX.set(x - containerRect.left - svgSize / 2);
			maskY.set(y - containerRect.top - svgSize / 2);
		}
	}, [x, y, svgSize, maskX, maskY]);

	// Smoothen the transformation for mask position using `framer-motion`
	const smoothMaskX = useTransform(maskX, (value) => `${value}px`);
	const smoothMaskY = useTransform(maskY, (value) => `${value}px`);

	const [recentHover, setRecentHover] = useState(false);

	useEffect(() => {
		setRecentHover(true);
		setSvgSize((prev) => (prev === 500 ? 5000 : 500));
		setTimeout(() => {
			setRecentHover(false);
		}, 300);
	}, [hovering]);

	return (
		<div
			className={twMerge("relative p-10 h-full w-full", className)}
			ref={containerRef}
		>
			<motion.div
				className={twMerge(
					"absolute inset-0 text-4xl",
					`dark:bg-[${maskColor}] bg-gray-200`
				)}
				animate={{
					WebkitMaskSize: `${svgSize}px`,
					WebkitMaskPosition: `${smoothMaskX.get()} ${smoothMaskY.get()}`,
				}}
				transition={{
					WebkitMaskSize: {
						type: "tween",
						ease: "easeOut",
						duration: 0.3,
					}, // smooth size animation

					WebkitMaskPosition:
						!hovering && !recentHover
							? {
									duration: 0,
								}
							: {
									type: "tween",
									ease: "easeOut",
									duration: 0.3,
								},
				}}
				style={{
					WebkitMaskImage: "url('/black-circle.svg')",
					WebkitMaskRepeat: "no-repeat",
					color: hoverColor ? hoverColor : "green",
				}}
			>
				{hovered === "About Us" && (
					<video
						src="placeholder.mp4"
						height={1920}
						width={1080}
						className="h-screen w-screen object-cover"
						muted
						autoPlay
						loop
					/>
				)}
				{hovered === "WATCH REEL" && (
					<video
						src="IMG_4377 2.MOV"
						autoPlay
						muted
						height={1920}
						width={1080}
						loop
						className="h-screen w-screen object-cover"
					/>
				)}
				{hovered === "OUR TEAM" && (
					<video
						src="placeholder.mp4"
						height={1920}
						width={1080}
						className="h-screen w-screen object-cover"
						muted
						autoPlay
						loop
					/>
				)}
				{hovered === "CONTACT" && (
					<video
						src="placeholder.mp4"
						height={1920}
						width={1080}
						className="h-screen w-screen object-cover opacity-25"
						autoPlay
						muted
						loop
					/>
				)}
			</motion.div>
			{children}
		</div>
	);
};

export default MaskCursor;
