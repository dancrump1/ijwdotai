"use client";

import React from "react";

import VideoPlayer from "@/registry/open-source/video-player";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<VideoPlayer />
		</div>
	);
}
