"use client";

import React from "react";

import CarouselCircle from "@/components/CarouselCircle";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<CarouselCircle
				images={[
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
				]}
			/>{" "}
		</div>
	);
}
