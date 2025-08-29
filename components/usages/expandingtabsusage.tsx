"use client";

import React from "react";

import ExpandableTabs from "@/registry/open-source/expanding-tabs";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ExpandableTabs />
		</div>
	);
}
