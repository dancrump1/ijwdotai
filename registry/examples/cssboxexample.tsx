"use client";

import React, { useRef } from "react";

import Image from "next/image";

import CSSBox, { CSSBoxRef } from "../open-source/CSSBox";

export default function Example() {
	const cubeRef = useRef<CSSBoxRef>(null);

	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<>
				<CSSBox
					ref={cubeRef}
					width={220}
					height={220}
					depth={220}
					perspective={800}
					draggable
					faces={{
						front: (
							<Image
								width={100}
								height={100}
								src="/itjustworks.jpg"
								alt="Front"
							/>
						),
						back: (
							<Image
								src="/itjustworks.jpg"
								width={100}
								height={100}
								alt="Back"
							/>
						),
						left: (
							<Image
								width={100}
								height={100}
								src="/itjustworks.jpg"
								alt="Left"
							/>
						),
						right: (
							<Image
								src="/itjustworks.jpg"
								width={100}
								height={100}
								alt="Right"
							/>
						),
						top: (
							<Image
								width={100}
								height={100}
								src="/itjustworks.jpg"
								alt="Top"
							/>
						),
						bottom: (
							<Image
								width={100}
								height={100}
								src="/itjustworks.jpg"
								alt="Bottom"
							/>
						),
					}}
				/>

				<Button onClick={() => cubeRef.current?.showTop()}>Show Top</Button>
			</>{" "}
		</div>
	);
}
