"use client";

import React from "react";

import AnimatedCard from "@/components/AnimatedHoverCard";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<AnimatedCard
				title="Hover to see the wizardry"
				subtitle="You hovered"
			/>
		</div>
	);
}
