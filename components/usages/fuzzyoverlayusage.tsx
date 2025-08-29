import React from "react";

import { motion } from "motion/react";

export default function FuzzyOverlayUsage() {
	return (
		// NOTE: An overflow of hidden will be required on a wrapping
		// element to see expected results
		<div className="relative overflow-hidden">
			<ExampleContent />
			<FuzzyOverlay />
		</div>
	);
}

const FuzzyOverlay = () => {
	return (
		<motion.div
			initial={{ transform: "translateX(-10%) translateY(-10%)" }}
			animate={{
				transform: "translateX(10%) translateY(10%)",
			}}
			transition={{
				repeat: Infinity,
				duration: 0.2,
				ease: "linear",
				repeatType: "mirror",
			}}
			// You can download these PNGs here:
			// https://www.hover.dev/black-noise.png
			// https://www.hover.dev/noise.png
			style={{
				backgroundImage: 'url("/black-noise.png")',
				// backgroundImage: 'url("/noise.png")',
			}}
			className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
		/>
	);
};

const ExampleContent = () => {
	return (
		<div className="relative grid h-screen place-content-center space-y-6 bg-background p-8">
			<p className="text-center text-6xl font-black text-secondary">
				Fuzzy Overlay Usage
			</p>
			<p className="text-center text-secondary">
				This is a basic example of using a lo-fi fuzzy overlay 📺
			</p>
			<div className="flex items-center justify-center gap-3">
				<button className="text-secondary w-fit px-4 py-2 font-semibold text-secondary transition-colors hover:bg-background">
					Pricing
				</button>
				<button className="w-fit bg-background px-4 py-2 font-semibold text-secondary transition-colors hover:bg-background">
					Try it free
				</button>
			</div>
		</div>
	);
};
