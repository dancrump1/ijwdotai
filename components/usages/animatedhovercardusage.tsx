"use client";

import React from "react";

import AnimatedCard from "@/registry/open-source/AnimatedHoverCard";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<AnimatedCard
				title="Hover to see the wizardry"
				subtitle="You hovered"
			/>
		</div>
	);
}
