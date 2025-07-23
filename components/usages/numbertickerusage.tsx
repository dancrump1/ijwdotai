"use client";

import React from "react";

import NumberTicker from "@/registry/open-source/NumberTicker";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<NumberTicker
				value={100}
				className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
			/>
		</div>
	);
}
