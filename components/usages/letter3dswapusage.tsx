"use client";

import React from "react";

import Letter3DSwap from "@/registry/open-source/Letter3dSwap";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<div className="flex flex-col items-center max-w-2xl ">
				<Letter3DSwap
					text="SET YOUR MIND TO IT"
					mainClassName="text-7xl bg-white lowercase"
					frontFaceClassName={`bg-white  text-black`}
					secondFaceClassName={`bg-white  text-black`}
					rotateDirection="top"
					paddingX={0}
					paddingY={0}
					staggerDuration={0.03}
					staggerFrom="first"
					transition={{
						type: "spring",
						damping: 25,
						stiffness: 160,
					}}
				/>
			</div>
		</div>
	);
}
