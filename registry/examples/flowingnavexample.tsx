"use client";

import React from "react";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<FlowingMenu
				items={[
					{
						link: "#",
						text: "Mojave",
						image: "/itjustworks.jpg",
					},
					{
						link: "#",
						text: "Sonoma",
						image: "/itjustworks.jpg",
					},
					{
						link: "#",
						text: "Monterey",
						image: "/itjustworks.jpg",
					},
					{
						link: "#",
						text: "Sequoia",
						image: "/itjustworks.jpg",
					},
				]}
			/>
		</div>
	);
}
