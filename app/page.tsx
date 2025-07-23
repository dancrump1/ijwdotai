"use client";

import { useState } from "react";

import Link from "next/link";

const categories = [
	"All",
	"Cards",
	"Buttons",
	"Text",
	"Backgrounds",
	"Carousels",
	"Navigation",
	"Loaders",
	"Accordions",
	"Images",
	"Scroll Effects",
	"Cursors",
	"Grids",
	"Forms",
	"Testimonials",
	"Effects",
];

export default function HomePage() {
	const [hovered, setHovered] = useState<string | null>(null);

	return (
		<main className="min-h-screen bg-zinc-950 text-white p-8">
			<h1 className="text-4xl font-bold mb-6 text-center">
				Component Categories
			</h1>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
				{categories.map((category) => (
					<Link
						key={category}
						onMouseEnter={() => setHovered(category)}
						onMouseLeave={() => setHovered(null)}
						href={
							(category === "All" ? "" : "/type/") +
							category.toLowerCase().replace(/s$/, "")
						}
						className={`rounded-2xl px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md ${
							category === "All" ? "text-red-400" : "text-white"
						}`}
					>
						{category === "All" && hovered === "All"
							? "will cause lag"
							: category}
					</Link>
				))}
			</div>
		</main>
	);
}
