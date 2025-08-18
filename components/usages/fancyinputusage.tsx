"use client";

import React from "react";

import { Subscribe } from "@/registry/open-source/fancy-input";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="p-4 w-full">
				<Subscribe />
			</div>
		</div>
	);
}
