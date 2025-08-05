"use client";

import React from "react";

import TextFocus from "@/registry/open-source/text-focus";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<TextFocus
				sentence="True Focus"
				manualMode={false}
				blurAmount={5}
				borderColor="red"
				animationDuration={2}
				pauseBetweenAnimations={1}
			/>{" "}
		</div>
	);
}
