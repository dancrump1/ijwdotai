"use client";

import React from "react";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<div style={{ height: "600px", position: "relative" }}>
				<InfiniteMenu
					items={[
						{
							image: "/itjustworks.jpg",
							link: "https://google.com/",
							title: "Item 1",
							description: "This is pretty cool, right?",
						},
						{
							image: "/itjustworks.jpg",
							link: "https://google.com/",
							title: "Item 2",
							description: "This is pretty cool, right?",
						},
						{
							image: "/itjustworks.jpg",
							link: "https://google.com/",
							title: "Item 3",
							description: "This is pretty cool, right?",
						},
						{
							image: "/itjustworks.jpg",
							link: "https://google.com/",
							title: "Item 4",
							description: "This is pretty cool, right?",
						},
					]}
				/>
			</div>
		</div>
	);
}
