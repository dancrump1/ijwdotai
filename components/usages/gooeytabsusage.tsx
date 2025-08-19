"use client";

import React from "react";

import { GooeyDemo } from "@/registry/open-source/gooey-tabs";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<GooeyDemo />
		</div>
	);
}
