"use client";

import React from "react";

import { FloatingDock } from "@/registry/open-source/floating-dock";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<FloatingDock />
		</div>
	);
}
