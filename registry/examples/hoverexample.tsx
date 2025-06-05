"use client";

import { DirectionAwareHover } from "@/components/Hover";

export function DirectionAwareHoverDemo() {
	const imageUrl = "/itjustworks.jpg";
	return (
		<div className="h-[40rem] relative  flex items-center justify-center">
			<DirectionAwareHover imageUrl={imageUrl}>
				<p className="font-bold text-xl">In the mountains</p>
				<p className="font-normal text-sm">$1299 / night</p>
			</DirectionAwareHover>
		</div>
	);
}
