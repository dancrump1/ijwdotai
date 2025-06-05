"use client";

import React from "react";

import Lanyard from "@/components/Lanyard";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<Lanyard position={[0, 0, 20]} gravity={[0, -40, 0]} />{" "}
		</div>
	);
}
