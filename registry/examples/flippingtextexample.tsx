"use client";

import React from "react";

import { TextAnimationFlippingWords } from "@/components/FlippingText";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<TextAnimationFlippingWords />
		</div>
	);
}
