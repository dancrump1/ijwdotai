"use client";

import React from "react";

import { FloatingDock } from "@/components/FloatingDock";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<FloatingDock />
		</div>
	);
}
