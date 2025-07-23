"use client";

import React from "react";

import { SocialLinks } from "@/registry/open-source/SocialLinks";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<SocialLinks
				socials={[
					{
						name: "Instagram",
						image: "/itjustworks.jpg",
					},
					{
						name: "LinkedIn",
						image: "/itjustworks.jpg",
					},
					{
						name: "Spotify",
						image: "/itjustworks.jpg",
					},
					{
						name: "TikTok",
						image: "/itjustworks.jpg",
					},
				]}
			/>
		</div>
	);
}
