"use client";

import React from "react";

import MagicBento from "@/registry/open-source/magic-bento";

export default function Usage() {
	return (
		<div className="relative w-full flex items-center justify-center">
			<MagicBento
				textAutoHide={true}
				enableStars={true}
				enableSpotlight={true}
				enableBorderGlow={true}
				enableTilt={true}
				enableMagnetism={true}
				clickEffect={true}
				spotlightRadius={300}
				particleCount={12}
				glowColor="132, 0, 255"
			/>
		</div>
	);
}
