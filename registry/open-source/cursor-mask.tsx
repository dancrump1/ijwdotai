"use client";

import type React from "react";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

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
	const size = hovering ? 5000 : 500;

	// Reference to the container to calculate offsets
	const containerRef = useRef<HTMLDivElement>(null);

	// Update mask position when the mouse moves
	useEffect(() => {
		if (containerRef.current) {
			const containerRect = containerRef.current.getBoundingClientRect();
			maskX.set(x - containerRect.left - size / 2);
			maskY.set(y - containerRect.top - size / 2);
		}
	}, [x, y, size, maskX, maskY]);

	// Smoothen the transformation for mask position using `framer-motion`
	const smoothMaskX = useTransform(maskX, (value) => `${value}px`);
	const smoothMaskY = useTransform(maskY, (value) => `${value}px`);

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
					WebkitMaskSize: `${size}px`,
					WebkitMaskPosition: `${smoothMaskX.get()} ${smoothMaskY.get()}`,
				}}
				transition={
					!hovering
						? {
								duration: 0,
							}
						: {
								type: "tween",
								ease: "easeOut",
								duration: 0.3,
							}
				}
				style={{
					WebkitMaskImage: "url('/black-circle.svg')",
					WebkitMaskRepeat: "no-repeat",
					color: hoverColor ? hoverColor : "green",
				}}
			>
				{children}
			</motion.div>
		</div>
	);
};

export default MaskCursor;
