import React from "react";

import { EvervaultCard, Icon } from "@/registry/open-source/hover-card";

export default function EvervaultCardDemo() {
	return (
		<div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
			<Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-secondary text-secondary" />
			<Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-secondary text-secondary" />
			<Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-secondary text-secondary" />
			<Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-secondary text-secondary" />

			<EvervaultCard text="hover" />

			<h2 className="dark:text-secondary text-secondary mt-4 text-sm font-light">
				Hover over this card to reveal an awesome effect. Running out of
				copy here.
			</h2>
			<p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-secondary dark:text-secondary px-2 py-0.5">
				Watch me hover
			</p>
		</div>
	);
}
