"use client";

import React from "react";

import { TextAnimationFlippingWords } from "@/registry/open-source/flipping-text";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<TextAnimationFlippingWords />
		</div>
	);
}
