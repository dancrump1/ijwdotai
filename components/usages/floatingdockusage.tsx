"use client";

import React from "react";

import { FloatingDock } from "@/registry/open-source/FloatingDock";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<FloatingDock />
		</div>
	);
}
