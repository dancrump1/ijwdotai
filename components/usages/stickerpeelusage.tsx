"use client";

import React from "react";

import PeelableSticker from "@/registry/open-source/StickerPeel";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<PeelableSticker message="test" stickerImage="/itjustworks.jpg" />
		</div>
	);
}
