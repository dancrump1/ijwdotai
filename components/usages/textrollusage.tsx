"use client";

import React from "react";

import { TextRoll } from "@/registry/open-source/text-roll";

export default function TextRollUsage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<TextRoll className="text-4xl text-black dark:text-white">
				Components
			</TextRoll>{" "}
		</div>
	);
}
