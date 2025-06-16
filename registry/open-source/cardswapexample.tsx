"use client";

import React from "react";

import CardSwap, { SwapCard } from "./CardSwap";

export const Example = () => {
	return (
		<CardSwap
			cardDistance={60}
			verticalDistance={70}
			delay={5000}
			pauseOnHover={false}
		>
			<SwapCard>
				<h3>Card 1</h3>
				<p>Your content here</p>
			</SwapCard>
			<SwapCard>
				<h3>Card 2</h3>
				<p>Your content here</p>
			</SwapCard>
			<SwapCard>
				<h3>Card 3</h3>
				<p>Your content here</p>
			</SwapCard>
		</CardSwap>
	);
};
