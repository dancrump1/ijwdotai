"use client";

import React from "react";

import FuzzyText from "@/components/FuzzyText";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<FuzzyText baseIntensity={0.2} hoverIntensity={0.2} enableHover={true}>
				404
			</FuzzyText>{" "}
		</div>
	);
}
