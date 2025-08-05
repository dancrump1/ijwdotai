"use client";

import React from "react";

import NavBar from "@/registry/open-source/3d-nav-bar";

export default function Usage() {
	return (
		<div className="relative w-full flex items-center justify-center">
			<NavBar className="top-2" />
			<p className="text-black dark:text-white">
				The Navbar will show on top of the page
			</p>
		</div>
	);
}
