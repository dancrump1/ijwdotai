"use client";

import React from "react";

import { TextRoll } from "@/registry/open-source/text-roll";

export default function TextRollUsage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<TextRoll className="text-4xl text-secondary dark:text-secondary">
				Components
			</TextRoll>{" "}
		</div>
	);
}
