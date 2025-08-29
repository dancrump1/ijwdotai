"use client";

import React from "react";

import { HorizontalScrollCarousel } from "@/components/HorizontalScrollGallery";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<div className="bg-neutral-800">
				<div className="flex h-48 items-center justify-center">
					<span className="font-semibold uppercase text-neutral-500">
						Scroll down
					</span>
				</div>
				<HorizontalScrollCarousel />
				<div className="flex h-48 items-center justify-center">
					<span className="font-semibold uppercase text-neutral-500">
						Scroll up
					</span>
				</div>
			</div>{" "}
		</div>
	);
}
