"use client";

import React from "react";

import VerticalTiles from "../open-source/StripesPreloader";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<VerticalTiles rerun>
				<span>Some content</span>
			</VerticalTiles>{" "}
		</div>
	);
}
