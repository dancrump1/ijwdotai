"use client";

import React from "react";

import FolderHoverButton from "@/components/FoldHoverButton";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<div className="flex justify-center items-center flex-col gap-6 w-full h-full">
				<FolderHoverButton
					folderName="🗽 New York, USA"
					images={[
						"/itjustworks.jpg",
						"/itjustworks.jpg",
						"/itjustworks.jpg",
						"/itjustworks.jpg",
					]}
				/>
			</div>{" "}
		</div>
	);
}
