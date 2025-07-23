"use client";

import React from "react";

import ModelViewer from "@/registry/open-source/ModelViewer";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<ModelViewer
				url="https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/main/2.0/ToyCar/glTF-Binary/ToyCar.glb"
				width={400}
				height={400}
			/>
		</div>
	);
}
