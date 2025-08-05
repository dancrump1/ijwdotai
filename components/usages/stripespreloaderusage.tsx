"use client";

import React from "react";

import VerticalTiles from "@/registry/open-source/stripes-preloader";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<VerticalTiles rerun>
				<span>Some content</span>
			</VerticalTiles>{" "}
		</div>
	);
}
