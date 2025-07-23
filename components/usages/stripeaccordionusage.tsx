"use client";

import React from "react";

import StripeAccordion, {
	UnsplashGrid,
} from "@/registry/open-source/StripeAccordion";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<StripeAccordion />
			<UnsplashGrid />
		</div>
	);
}
