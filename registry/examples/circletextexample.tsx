"use client";

import React from "react";

import CircularText from "../open-source/CircleText";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<CircularText
				text="TECH*CHUNKS*COMPONENTS*"
				onHover="speedUp"
				spinDuration={20}
			/>
		</div>
	);
}
