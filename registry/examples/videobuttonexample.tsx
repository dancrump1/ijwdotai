"use client";

import React from "react";

import VideoButton from "@/components/VideoButton";

export default function VideoButtonExample() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<VideoButton videoSrc="/placeholder.mp4">
				<span className="text-xl font-semibold">Join the club!</span>
			</VideoButton>
		</div>
	);
}
