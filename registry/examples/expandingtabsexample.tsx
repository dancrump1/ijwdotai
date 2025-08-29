"use client";

import React from "react";

import ExpandableTabs from "@/components/ExpandingTabs";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<ExpandableTabs />
		</div>
	);
}
