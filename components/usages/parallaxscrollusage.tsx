"use client";

import React from "react";

import { ParallaxScroll } from "@/registry/open-source/ParallaxScroll";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<ParallaxScroll
				images={[
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
				]}
			/>
		</div>
	);
}
