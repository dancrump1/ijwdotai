"use client";

import React, { useEffect, useState } from "react";

import { AnimatePresence } from "framer-motion";

function Page({ children }) {
	const [loader, setLoader] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			setLoader(false);
		}, 2250);
	}, [loader]);

	return (
		<span className="mt-6 block">
			{!loader && (
				<button onClick={() => setLoader(true)}>reset preloader</button>
			)}

			<AnimatePresence mode="wait">{loader && children}</AnimatePresence>

			{!loader && <div>your content goes here</div>}
		</span>
	);
}
export default Page;
