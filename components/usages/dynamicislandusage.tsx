"use client";

import React from "react";

import DynamicIsland from "@/registry/open-source/dynamic-island";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<DynamicIsland />
		</div>
	);
}
