"use client";

import React from "react";

import { HoverBorderGradient } from "@/registry/open-source/hover-border";

export default function HoverBorderGradientDemo() {
	return (
		<div className="m-40 flex justify-center text-center">
			<HoverBorderGradient
				containerClassName="rounded-full"
				as="button"
				className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
			>
				<span>Aceternity UI</span>
			</HoverBorderGradient>
		</div>
	);
}
