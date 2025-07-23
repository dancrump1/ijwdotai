"use client";

import React from "react";

import { SmoothCursor } from "@/registry/open-source/SmoothCursor";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<SmoothCursor />{" "}
		</div>
	);
}
