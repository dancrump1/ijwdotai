"use client";

import React from "react";

import DualRingSpinnerLoader from "@/registry/open-source/dual-ring-loader";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<DualRingSpinnerLoader />
		</div>
	);
}
