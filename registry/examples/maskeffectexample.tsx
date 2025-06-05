"use client";

import React from "react";

import { MaskContainer } from "@/components/MaskEffect";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<MaskContainer revealText="it just works">
				<div>Some content</div>
			</MaskContainer>
		</div>
	);
}
