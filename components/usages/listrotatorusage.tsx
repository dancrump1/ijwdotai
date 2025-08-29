"use client";

import React from "react";

import ListRotator from "@/registry/open-source/list-rotator";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ListRotator />
		</div>
	);
}
