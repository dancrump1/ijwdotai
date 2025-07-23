"use client";

import React from "react";

import { SpringElement } from "@/registry/open-source/SpringElement";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Avatar } from "radix-ui";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<SpringElement>
				<Avatar className="size-12">
					<AvatarImage draggable={false} src={"/itjustworks.jpg"} />
					<AvatarFallback>{"/itjustworks.jpg"}</AvatarFallback>
				</Avatar>
			</SpringElement>
		</div>
	);
}
