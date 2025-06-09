"use client";

import React, { useCallback, useState } from "react";

import { ScrollIsland } from "../open-source/ScrollIsland";

export default function Example() {
	const [titleEls, setTitleEls] = useState<HTMLElement[]>([]);

	const setupTitles = useCallback((node: HTMLDivElement) => {
		if (node) {
			const titleEls = Array.from(
				node.querySelectorAll(".component-container")
			);
			setTitleEls(titleEls.map((el) => el.children[0].children[0]));
		}
	}, []);
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<ScrollIsland ref={setupTitles}>
				<h1>test test 123</h1>
				<section className="component-container">
					<p>yup!</p>
				</section>
				<section className="component-container">
					<p>yup!</p>
				</section>
				<section className="component-container">
					<p>yup!</p>
				</section>
				<section className="component-container">
					<p>yup!</p>
				</section>
				<section className="component-container">
					<p>yup!</p>
				</section>
				<section className="component-container">
					<p>yup!</p>
				</section>
			</ScrollIsland>
		</div>
	);
}
