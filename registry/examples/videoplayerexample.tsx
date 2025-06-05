"use client";

import React from "react";

import VideoPlayer from "@/components/VideoPlayer";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<VideoPlayer />
		</div>
	);
}
