"use client";

import React from "react";

import FuzzyText from "@/registry/open-source/fuzzy-text";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<FuzzyText baseIntensity={0.2} hoverIntensity={0.2} enableHover={true}>
				404
			</FuzzyText>{" "}
		</div>
	);
}
