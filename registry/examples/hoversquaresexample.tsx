"use client";

import React from "react";

import { ClipPathLinks } from "@/components/HoverSquares";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<div className="bg-neutral-50 px-4 py-12">
				<div className="mx-auto max-w-7xl">
					<ClipPathLinks />
				</div>
			</div>{" "}
		</div>
	);
}
