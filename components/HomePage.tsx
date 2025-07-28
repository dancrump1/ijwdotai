"use client";

import { useState } from "react";

import Link from "next/link";

export const categories = {
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

export default function HomePage({
	files,
}: {
	files: { name: string; isNew: boolean }[];
}) {
	const [hovered, setHovered] = useState<string | null>(null);

	const [items, setItems] = useState([""]);
	const [subcategories, setSubcategories] = useState([""]);
	const [newItems, setNewItems] = useState<any[]>([]);

	return (
		<main className="min-h-screen bg-zinc-950 text-white p-8">
			<div className="flex h-full">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto h-fit">
					{Object.entries(categories).map(
						([category, subcategories], i) => {
							// Build query string from subcategories
							const queryString =
								category === "All"
									? ""
									: "?" +
										subcategories
											.map(
												(sub) =>
													`subcategory=${encodeURIComponent(sub)}`
											)
											.join("&");

							// Build href
							const href =
								category === "All"
									? "/all"
									: `/type/${encodeURIComponent(category.toLowerCase().replace(/\s&\s|\s/g, "-"))}${queryString}`;

							const categoryTotal = files.filter(
								({ name }) =>
									name.includes(category) ||
									!!subcategories
										.map((filter) => name.includes(filter))
										.filter((item) => !!item).length
							);

							const containsNew = !!categoryTotal.find(
								(item) => !!item.isNew
							);

							return (
								<Link
									key={category}
									onMouseEnter={() => {
										setHovered(category);
										setItems(categoryTotal.map((item) => item.name));
										setSubcategories(subcategories);
										containsNew &&
											categoryTotal.forEach(
												(item) =>
													item.isNew &&
													setNewItems((prev) => [...prev, item])
											);
									}}
									onMouseLeave={() => {
										setHovered(null);
										setItems([]);
										setSubcategories([]);
										setNewItems([]);
									}}
									href={href}
									className={`rounded-2xl h-fit relative px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md ${
										category === "All" ? "text-red-400" : "text-white"
									}`}
								>
									{category === "All" && hovered === "All"
										? "will cause lag"
										: category}
									<br />
									{category === "All"
										? files.length
										: categoryTotal.length}
									<br />
									{containsNew && (
										<span className="absolute -top-0 -right-0 rotate-45">
											⭐
										</span>
									)}
								</Link>
							);
						}
					)}
					{!!newItems.length && (
						<div className="hidden md:block ">
							<span className="text-lg border-b-2 border-white">
								New Items:
							</span>
							<ul className="flex flex-col flex-wrap h-full overflow-hidden">
								{newItems.map((item) => (
									<li>{item.name.replace("usage.tsx", "")}</li>
								))}
							</ul>
						</div>
					)}
				</div>
				<div className="hidden md:block md:w-[25%] ">
					<span className="text-lg border-b-2 border-white">
						Filter Match:
					</span>
					<ul className="flex flex-col flex-wrap h-full overflow-hidden">
						{subcategories.map((item) => (
							<li>{item}</li>
						))}
					</ul>
				</div>
				<div className="hidden md:block md:w-[25%] ">
					<span className="text-lg border-b-2 border-white">
						Matching Items:
					</span>
					<ul className="flex flex-col flex-wrap h-full overflow-hidden">
						{items.map((item) => (
							<li>{item.replace("usage.tsx", "")}</li>
						))}
					</ul>
				</div>
			</div>
		</main>
	);
}
