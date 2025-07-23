"use client";

import React from "react";

import { PlaceholdersAndVanishInput } from "@/registry/open-source/Searchbar";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<PlaceholdersAndVanishInput />
		</div>
	);
}
