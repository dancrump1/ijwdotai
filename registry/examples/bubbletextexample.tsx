"use client";

import React from "react";

import BubbleText from "@/components/BubbleText";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<div className="grid h-screen place-content-center bg-black">
				<BubbleText text="bubble text" />
			</div>
		</div>
	);
}
