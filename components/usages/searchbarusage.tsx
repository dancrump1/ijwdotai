"use client";

import React from "react";

import { PlaceholdersAndVanishInput } from "@/registry/open-source/searchbar";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<PlaceholdersAndVanishInput />
		</div>
	);
}
