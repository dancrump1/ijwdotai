"use client";

import React from "react";

import Image from "next/image";

import { Lens } from "@/registry/open-source/Lens";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<Lens>
				<Image
					src={"/itjustworks.jpg"}
					alt={"it just woks"}
					width={images?.[0]?.width || 0}
					height={images?.[0]?.height || 0}
					className="object-cover max-h-[80vh] w-auto mx-auto border-8 border-background"
					style={
						images?.[0].focalPoint
							? {
									objectPosition: `${
										images[0]?.focalPoint?.[0] * 100
									}% ${images[0]?.focalPoint?.[1] * 100}%`,
								}
							: {}
					}
				/>
			</Lens>{" "}
		</div>
	);
}
