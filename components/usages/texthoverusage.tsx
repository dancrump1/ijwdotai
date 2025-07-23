"use client";

import React from "react";

import { TextHoverEffect } from "@/registry/open-source/TextHover";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<TextHoverEffect text={"Components"} />
		</div>
	);
}
