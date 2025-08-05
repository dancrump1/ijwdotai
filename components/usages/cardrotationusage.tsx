"use client";

import React from "react";

import { CardRotation } from "@/registry/open-source/card-rotation";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<CardRotation />
		</div>
	);
}
