"use client";

import React from "react";

import DynamicIsland from "@/components/DynamicIsland";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<DynamicIsland />
		</div>
	);
}
