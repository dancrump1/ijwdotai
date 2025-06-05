"use client";

import React from "react";

import { VideoContainer } from "@/components/VideoViewer";

export default function Example() {
	return (
		<div className="h-screen w-screen flex items-center justify-center relative overflow-hidden bg-black">
			<VideoContainer />
		</div>
	);
}
