"use client";

import React from "react";

import { Compare } from "@/components/Compare";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<Compare firstImage="itjustworks.jpg" secondImage="itjustworks.jpg" />
		</div>
	);
}
