"use client";

import React from "react";

import { HoverCard } from "@/components/HoverGallery";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<HoverCard
				cards={[
					{
						name: "something",
						top: "/itjustworks.jpg",
						left: "/itjustworks.jpg",
						right: "/itjustworks.jpg",
					},
					{
						name: "something else",
						top: "/itjustworks.jpg",
						left: "/itjustworks.jpg",
						right: "/itjustworks.jpg",
					},
					{
						name: "maybe more",
						top: "/itjustworks.jpg",
						left: "/itjustworks.jpg",
						right: "/itjustworks.jpg",
					},
				]}
			/>{" "}
		</div>
	);
}
