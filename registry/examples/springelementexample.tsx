"use client";

import React from "react";

import { Spotlight } from "@/components/SpringElement";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<SpringElement>
				<Avatar className="size-12">
					<AvatarImage draggable={false} src={USER.src} />
					<AvatarFallback>{USER.fallback}</AvatarFallback>
				</Avatar>
			</SpringElement>
		</div>
	);
}
