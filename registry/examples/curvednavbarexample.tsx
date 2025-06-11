"use client";

import React from "react";

import { AnimatePresence } from "motion/react";

import CurvedNavbar from "../open-source/CurvedNavbar";

export default function Example() {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<>
				<div
					onClick={() => {
						setIsActive(!isActive);
					}}
					className={`w-20 h-20 rounded-full flex flex-col items-center justify-center`}
				>
					open curve nav
				</div>

				<AnimatePresence mode="wait">
					{isActive && (
						<CurvedNavbar isActive={isActive} setIsActive={setIsActive} />
					)}
				</AnimatePresence>
			</>{" "}
		</div>
	);
}
