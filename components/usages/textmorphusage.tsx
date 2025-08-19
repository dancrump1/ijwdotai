"use client";

import { useState } from "react";

import { TextMorph } from "@/registry/open-source/text-morph";

export default function TextMorphButton() {
	const [text, setText] = useState("Continue");

	return (
		<button
			onClick={() => setText(text === "Continue" ? "Confirm" : "Continue")}
			className="flex h-10 w-[120px] shrink-0 items-center justify-center rounded-full bg-background px-4 text-base font-medium text-secondary shadow-xs transition-colors hover:bg-background dark:bg-background dark:text-secondary dark:hover:bg-background"
		>
			<TextMorph>{text}</TextMorph>
		</button>
	);
}
