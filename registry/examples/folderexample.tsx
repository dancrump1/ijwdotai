"use client";

import React from "react";

import Folder from "../open-source/Folder";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<div style={{ height: "600px", position: "relative" }}>
				<Folder size={2} color="#00d8ff" className="custom-folder" />
			</div>{" "}
		</div>
	);
}
