import { Suspense } from "react";

import HomePage from "@/components/HomePage";
import { getComponentFilesWithDates } from "@/lib/fetch";

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

export default async function Page({}: {}) {
	const files = await getComponentFilesWithDates();

	return (
		<>
			<Suspense fallback={<span>Loading</span>}>
				{" "}
				<HomePage files={files} />
			</Suspense>
		</>
	);
}
