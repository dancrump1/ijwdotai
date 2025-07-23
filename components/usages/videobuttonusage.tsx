"use client";

import React from "react";

import VideoButton from "@/registry/open-source/VideoButton";

export default function VideoButtonUsage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<VideoButton videoSrc="/placeholder.mp4">
				<span className="text-xl font-semibold">Join the club!</span>
			</VideoButton>
		</div>
	);
}
