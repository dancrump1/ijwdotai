"use client";

import React from "react";

import { TransitionPanel } from "@/registry/open-source/tabs-transition-panel";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<TransitionPanel />
		</div>
	);
}
