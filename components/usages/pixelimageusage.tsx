"use client";

import React from "react";

import PixelImage from "@/registry/open-source/pixel-image";

export default function Usage() {
	return (
		<div className="relative w-full flex items-center justify-center">
			<PixelImage
				src="/itjustworks.jpg"
				customGrid={{ rows: 4, cols: 6 }}
				grayscaleAnimation
			/>
		</div>
	);
}
