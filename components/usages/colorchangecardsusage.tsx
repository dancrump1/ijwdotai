"use client";

import React from "react";

import ColorChangeCards from "@/registry/open-source/color-change-cards";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ColorChangeCards />{" "}
		</div>
	);
}
