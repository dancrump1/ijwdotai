"use client";

import { TextSplit } from "../open-source/TextSplit";

export default function TextRotateExample() {
	return (
		<div className="w-dvw h-dvh text-2xl sm:text-3xl md:text-5xl flex flex-row items-center justify-center font-overused-grotesk bg-white dark:text-muted text-foreground font-light overflow-hidden p-12 sm:p-20 md:p-24">
			<TextSplit
				className="text-9xl font-semibold uppercase"
				topClassName="text-red-500"
				bottomClassName="text-zinc-950 dark:text-zinc-50"
			>
				Berlix UI
			</TextSplit>
			;{" "}
		</div>
	);
}
