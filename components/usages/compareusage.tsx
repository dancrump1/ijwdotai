"use client";

import React from "react";

import { Compare } from "@/registry/open-source/Compare";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<Compare firstImage="itjustworks.jpg" secondImage="itjustworks.jpg" />
		</div>
	);
}
