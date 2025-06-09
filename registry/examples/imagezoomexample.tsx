"use client";

import React from "react";

import ImageZoom from "../open-source/ImageZoom";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<div>
				<ImageZoom
					outsideImage={"/oie_transparent.png"}
					insideImage={"/itjustworks.jpg"}
				/>
			</div>{" "}
		</div>
	);
}
