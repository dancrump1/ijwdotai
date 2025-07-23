"use client";

import { useState } from "react";

import Link from "next/link";

const categories = {
	All: [],
	Cards: ["card", "deck", "stack", "flip", "tile"],
	Buttons: ["button", "btn", "click", "press"],
	Text: ["text", "label", "type", "word", "letter", "font"],
	Backgrounds: [
		"background",
		"bg",
		"back",
		"vignette",
		"veil",
		"gradient",
		"blur",
		"star",
		"matrix",
	],
	Carousels: ["carousel", "slider", "gallery", "reel", "marquee"],
	Navigation: [
		"nav",
		"navbar",
		"menu",
		"sidebar",
		"tabs",
		"cta",
		"scrolllink",
	],
	Loaders: ["loader", "loading", "spinner", "preloader"],
	Accordions: ["accordion", "faq", "expand", "collapse"],
	Images: [
		"image",
		"zoom",
		"viewer",
		"ripple",
		"lens",
		"macbook",
		"media",
		"model",
		"canvas",
	],
	"Scroll Effects": [
		"scroll",
		"parallax",
		"sticky",
		"reveal",
		"float",
		"island",
	],
	Cursors: ["cursor", "pointer", "mouse", "trail", "target", "eyes"],
	"Grids & Layouts": ["grid", "layout", "bento", "masonry", "columns", "rows"],
	"Forms & Inputs": [
		"form",
		"input",
		"search",
		"checkbox",
		"modal",
		"select",
		"field",
		"editor",
	],
	Testimonials: ["testimonial", "quote", "review"],
	"Animations & FX": [
		"animated",
		"effect",
		"motion",
		"hover",
		"focus",
		"swap",
		"dynamic",
		"spring",
		"trail",
		"morph",
		"transition",
		"sparkle",
		"glow",
		"shine",
		"fuzzy",
		"flip",
		"highlight",
		"zoom",
	],
	"3D & Canvas": ["3d", "globe", "canvas", "model", "viewer", "lens"],
	"Data & Tables": ["table", "chart", "list", "view", "ticker"],
	Utilities: ["provider", "context", "helper", "tool", "sandbox"],
	Videos: ["video", "movie", "player"],
};

export default function HomePage() {
	const [hovered, setHovered] = useState<string | null>(null);

	return (
		<main className="min-h-screen bg-zinc-950 text-white p-8">
			<h1 className="text-4xl font-bold mb-6 text-center">
				Component Categories
			</h1>
			<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
				{Object.entries(categories).map(([category, subcategories]) => {
					// Build query string from subcategories
					const queryString =
						category === "All"
							? ""
							: "?" +
								subcategories
									.map(
										(sub) => `subcategory=${encodeURIComponent(sub)}`
									)
									.join("&");

					// Build href
					const href =
						category === "All"
							? "/"
							: `/type/${encodeURIComponent(category.toLowerCase().replace(/\s&\s|\s/g, "-"))}${queryString}`;

					return (
						<Link
							key={category}
							onMouseEnter={() => setHovered(category)}
							onMouseLeave={() => setHovered(null)}
							href={href}
							className={`rounded-2xl px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md ${
								category === "All" ? "text-red-400" : "text-white"
							}`}
						>
							{category === "All" && hovered === "All"
								? "will cause lag"
								: category}
						</Link>
					);
				})}
			</div>
		</main>
	);
}
