"use client";

import React from "react";

import { FloatingNav } from "@/components/FloatingNav";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<div className="h-screen overflow-auto">
				<div className="h-[200vh] " />
				<FloatingNav />
			</div>
		</div>
	);
}
