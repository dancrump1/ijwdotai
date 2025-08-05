"use client";

import React from "react";

import MaskCursor from "@/registry/open-source/cursor-mask";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<MaskCursor />
		</div>
	);
}
