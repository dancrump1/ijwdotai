"use client";

import React from "react";

import { TextAnimate } from "@/components/TextAnimate";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<TextAnimate
				once={true}
				animation="fadeIn"
				by="character"
				duration={1}
			>
				Components
			</TextAnimate>{" "}
		</div>
	);
}
