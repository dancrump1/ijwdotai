"use client";

import React from "react";

import ZoomBlurCard from "@/components/ZoomBlurCard";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<div className="w-full max-w-md">
				<ZoomBlurCard
					title="Zoom Blur Card"
					description="The card component with zoom blur effect"
					imageUrl="/itjustworks.jpg"
				/>
			</div>{" "}
		</div>
	);
}
