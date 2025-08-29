"use client";

import React from "react";

import BubbleText from "@/registry/open-source/bubble-text";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="grid h-screen place-content-center bg-background">
				<BubbleText text="bubble text" />
			</div>
		</div>
	);
}
