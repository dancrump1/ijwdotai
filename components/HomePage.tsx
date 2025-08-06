"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { simpleCategories } from "@/config/components";

export const categories = {
	All: [],
	New: [],
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

const credits = [
	"https://www.fancycomponents.dev",
	"https://www.ui-layouts.com",
	"https://github.com/pqoqubbw/icons",
	"https://www.joshuawootonn.com/",
	"https://skiper-ui.com/",
	"https://www.hover.dev",
	"https://kokonutui.com/",
	"https://zenui.net/",
	"https://ui.noxhd.com",
	"https://www.reactbits.dev/",
	"https://ui.noxhd.com/",
	"https://www.serenity-ui.com/",
	"https://cuicui.day/",
	"https://starui.link/",
	"https://berlix.vercel.app/",
	"https://ui.aceternity.com/",
	"https://www.cult-ui.com/",
	"https://auraui.vercel.app/",
	"https://www.sparkui.me/",
	"https://www.kibo-ui.com/",
	"https://www.smoothui.dev/",
	"https://geist.vercel.app/",
	"https://eclairui.gopx.dev/",
	"https://namer-ui.netlify.app/",
	"https://animata.design/",
	"https://ground.bossadizenith.me",
	"https://www.hover.dev/",
	"https://www.edilozi.pro/",
	"https://www.pldkhoa.dev",
	"https://karrix.dev/",
	"https://github.com/PhanDangKhoa96",
	"https://www.diceui.com",
	"https://motion-primitives.com/",
	"https://codepen.io/jh3y/pen/gOEgxbd",
	"https://pro.lightswind.com/",
	"https://aetherui.in/",
	"https://21st.dev/",
	"https://www.vyomaui.design",
];

export default function HomePage({ files }: { files: { name: string }[] }) {
	const [hovered, setHovered] = useState<string | null>(null);

	const [items, setItems] = useState([""]);
	const [subcategories, setSubcategories] = useState([""]);

	return (
		<main className="min-h-screen bg-zinc-950 text-white p-8">
			<section>
				<h2>Heavy animations</h2>
				<div className="grid grid-cols-7 h-full min-h-screen">
					<div className="grid grid-cols-2 col-span-7 md:col-span-3 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto h-fit">
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

								return (
									<Link
										key={category}
										onMouseEnter={() => {
											setHovered(category);
											setItems(
												categoryTotal.map((item) => item.name)
											);
											setSubcategories(subcategories);
										}}
										onMouseLeave={() => {
											setHovered(null);
											setItems([]);
											setSubcategories([]);
										}}
										href={href}
										className={`rounded-2xl h-fit relative px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md ${
											category === "All"
												? "text-red-400"
												: "text-white"
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
									</Link>
								);
							}
						)}
						<span
							className={`rounded-2xl h-fit relative px-6 py-4 bg-zinc-800 transition-colors text-center font-medium shadow-md ${"text-white"}`}
						>
							⭐: Component added within a week
							<br />
							All: May cause lag
						</span>
					</div>
					<div className="hidden md:block col-span-2">
						<span className="text-lg border-b-2 border-white">
							Matching Items:
						</span>
						<ul className="flex flex-col flex-wrap h-full max-h-[50vh] overflow-hidden">
							{items.map((item) => (
								<li>{item.replace(".json", "")}</li>
							))}
						</ul>
					</div>
					<div className="hidden md:block col-span-1">
						<span className="text-lg border-b-2 border-white">
							Filter Match:
						</span>
						<ul className="flex flex-col flex-wrap h-full overflow-hidden">
							{subcategories.map((item) => (
								<li>{item.replace(".json", "")}</li>
							))}
						</ul>
					</div>
					<div className="hidden md:block col-span-1">
						<div className="hidden md:block ">
							<span className="text-lg border-b-2 border-white">
								New Items:
							</span>
						</div>
					</div>
				</div>
			</section>
			<section className="h-[50vh]">
				<h2>Credits ({credits.length}):</h2>
				<div className="flex flex-wrap gap-2">
					{credits.sort().map((item, i) => (
						<a
							href={item}
							target="_blank"
							rel="noopener noreferrer"
							className={`rounded-2xl h-fit relative px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md ${"text-white"}`}
						>
							{item
								.replace("https://", "")
								.replace("www.", "")
								.replace(".dev", "")
								.replace(".com", "")
								.replace(".net", "")
								.replace(".me", "")
								.replace(".io", "")
								.replace(".app", "")
								.replace("/", "")
								.replace(".design", "")}
						</a>
					))}
				</div>
			</section>
			<section>
				<h3>Basic Animations</h3>
				<div className="grid grid-cols-2 col-span-7 md:col-span-3 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto h-fit">
					{simpleCategories.map(({ slug, name }) => (
						<Link
							href={"/" + slug}
							className="rounded-2xl h-fit relative px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md text-white"
							tabIndex={-1}
						>
							{name}
						</Link>
					))}
				</div>
			</section>
		</main>
	);
}
