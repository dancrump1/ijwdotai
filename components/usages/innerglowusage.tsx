"use client";

import React from "react";

import { InnerGlow } from "@/registry/open-source/inner-glow";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<div className="grid relative mx-auto w-[300px] h-[300px] overflow-hidden bg-white rounded-md p-6 aspect-square place-items-center text-3xl font-medium">
				<InnerGlow />
				<p>Inner Glow</p>
			</div>{" "}
		</div>
	);
}
