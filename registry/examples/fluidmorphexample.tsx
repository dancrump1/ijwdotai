"use client";

import React from "react";

import FluidMorph from "../open-source/FluidMorph";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<FluidMorph />
		</div>
	);
}
