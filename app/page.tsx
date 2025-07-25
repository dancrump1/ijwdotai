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

export const components = [
	"3dcardusage.tsx",
	"3dnavbarusage.tsx",
	"accordionslicesusage.tsx",
	"actionsearchbarusage.tsx",
	"animatedaccordionusage.tsx",
	"animatedhovercardusage.tsx",
	"animatedlistusage.tsx",
	"attractorusage.tsx",
	"aurorabackgroundusage.tsx",
	"awardcarouselusage.tsx",
	"backgroundbeamsusage.tsx",
	"backgroundboxesusage.tsx",
	"backgroundgradientusage.tsx",
	"backgroundusage.tsx",
	"ballpitusage.tsx",
	"bentousage.tsx",
	"blurvignetteusage.tsx",
	"booktestimonialsusage.tsx",
	"bottomblurusage.tsx",
	"btn08usage.tsx",
	"bubbletextusage.tsx",
	"businessfooterusage.tsx",
	"canvasrevealusage.tsx",
	"carddeckusage.tsx",
	"cardhoverusage.tsx",
	"cardrotationusage.tsx",
	"cardstackusage.tsx",
	"cardsusage.tsx",
	"cardswapusage.tsx",
	"carouselcircleusage.tsx",
	"carouselstackusage.tsx",
	"checkboxanimatedusage.tsx",
	"chromagridusage.tsx",
	"circleaccordionusage.tsx",
	"circletextusage.tsx",
	"circularbarsloaderusage.tsx",
	"codeblockusage.tsx",
	"colorchangecardsusage.tsx",
	"colorfultextusage.tsx",
	"colorpickerusage.tsx",
	"compareusage.tsx",
	"containerscrollusage.tsx",
	"contentwithimageusage.tsx",
	"cssboxusage.tsx",
	"cubesusage.tsx",
	"cursorcarouselusage.tsx",
	"cursormaskusage.tsx",
	"curvednavbarusage.tsx",
	"darkveilusage.tsx",
	"dialogstackusage.tsx",
	"diamondgalleryusage.tsx",
	// "ditherusage.tsx",
	"dualringloaderusage.tsx",
	"dualringspinnerloaderusage.tsx",
	"dynamicislandusage.tsx",
	"dynamicthemeusage.tsx",
	"editorusage.tsx",
	"elasticlineusage.tsx",
	"expandingtabsusage.tsx",
	"fallingtextusage.tsx",
	"fancyinputusage.tsx",
	"faqsectionusage.tsx",
	"faultyterminalusage.tsx",
	"featuresusage.tsx",
	"featureusage.tsx",
	"filmreelusage.tsx",
	"fishybuttonusage.tsx",
	"flipcardusage.tsx",
	// "flippedmenuusage.tsx",
	"flippingtextusage.tsx",
	"floatingdockusage.tsx",
	"floatingherousage.tsx",
	"floatingnavusage.tsx",
	"flowermenuusage.tsx",
	"flowingnavusage.tsx",
	"fluidglassusage.tsx",
	"fluidmorphusage.tsx",
	"focuscardsusage.tsx",
	// TODO: Which is broken
	// "folderusage.tsx",
	// "foldhoverbuttonusage.tsx",
	// "followcursorusage.tsx",
	// "followingheadersusage.tsx",
	// "followingheadersusage.tsx",
	// "followingpointerusage.tsx",
	// "fractalgridusage.tsx",
	// "frequencyusage.tsx",
	// "fullscreenimageusage.tsx",
	// "fuzzyoverlayusage.tsx",
	// "fuzzytextusage.tsx",
	// TODO: Which is broken
	// "galaxybuttonusage.tsx",
	// "galleryusage.tsx",
	// "ghostlabelusage.tsx",
	// "giftextusage.tsx",
	// "glassnavusage.tsx",
	// "globeusage.tsx",
	// "glowingbackgroundusage.tsx",
	// "glowingeffectusage.tsx",
	"gooeytabsusage.tsx",
	"gradientbackgroundusage.tsx",
	"gradientcheckboxusage.tsx",
	"gradienttestimonialsusage.tsx",
	"gravityusage.tsx",
	"gridcontentusage.tsx",
	"griddistortionusage.tsx",
	"gridtoflexusage.tsx",
	"gsapproviderusage.tsx",
	"halffilledtextusage.tsx",
	"herohighlightusage.tsx",
	"heroparallaxusage.tsx",
	"horizontalctausage.tsx",
	"HorizontalProgressCarouselusage.tsx",
	"horizontalscrollgalleryusage.tsx",
	"horizontalscrollusage.tsx",
	"hoverborderusage.tsx",
	"hovercardsusage.tsx",
	"hovercardusage.tsx",
	"hovergalleryusage.tsx",
	"hoversquaresusage.tsx",
	"hoverusage.tsx",
	// TODO: Why is icons undefined
	// "Iconsusage.tsx",
	"imagerevealusage.tsx",
	"imagerippleusage.tsx",
	"imagewheelusage.tsx",
	"imagezoomusage.tsx",
	"improvementsusage.tsx",
	"infinitecarouselusage.tsx",
	"infinitemenuusage.tsx",
	"infinitemovingcardsusage.tsx",
	"infocardusage.tsx",
	"innerglowusage.tsx",
	"inputanimatedusage.tsx",
	"introductionusage.tsx",
	"lampusage.tsx",
	"lanecardusage.tsx",
	"lanyardusage.tsx",
	"layoutgridusage.tsx",
	"lensusage.tsx",
	// TODO: Which of these is broken
	// "letter3dswapusage.tsx",
	// "letterhoverusage.tsx",
	// "lightraysusage.tsx",
	// "lineardialogusage.tsx",
	// "linebackgroundusage.tsx",
	// "linkpreviewusage.tsx",
	// "listrotatorusage.tsx",
	// "lottiescrolltriggerusage.tsx",
	"macbookusage.tsx",
	"magicbentousage.tsx",
	"magnetlinesusage.tsx",
	"marqueealongsvgusage.tsx",
	"maskeffectusage.tsx",
	"masonryusage.tsx",
	"matrixbackgroundusage.tsx",
	"mediabetweentextusage.tsx",
	"meteorsusage.tsx",
	"mobilenavbasicusage.tsx",
	"mobilenavusage.tsx",
	"modelviewerusage.tsx",
	"mouseimagetrailusage.tsx",
	"moviegalleryusage.tsx",
	"navbar2usage.tsx",
	"navbar3usage.tsx",
	"navbarusage.tsx",
	"navigationusage.tsx",
	"ninedotloaderusage.tsx",
	"numbertickerusage.tsx",
	"oppositescrolllinksusage.tsx",
	"oppositescrollusage.tsx",
	"parallaxcarouselusage.tsx",
	"parallaxfloatingusage.tsx",
	"parallaxscrollusage.tsx",
	"peelrevealusage.tsx",
	"pingpongusage.tsx",
	"pinusage.tsx",
	"pipelineusage.tsx",
	"pixelimageusage.tsx",
	"pointerdemousage.tsx",
	"pointerhoverusage.tsx",
	"pointerusage.tsx",
	"popularpricecardusage.tsx",
	"positionawarebuttonusage.tsx",
	"poweroffslideusage.tsx",
	"preloaderusage.tsx",
	"pricecardusage.tsx",
	"pricingtableusage.tsx",
	"progresscarouselusage.tsx",
	"progressiveblurusage.tsx",
	"projectshowcaseusage.tsx",
	"randomletterswaphoverusage.tsx",
	"resizenavbarusage.tsx",
	"roundedscrollbarusage.tsx",
	"sandboxusage.tsx",
	"scalingbuttonusage.tsx",
	// "screensaverusage.tsx",
	"scrollfloatusage.tsx",
	"scrollislandusage.tsx",
	"scrollrevealusage.tsx",
	"scrolltriggercontextusage.tsx",
	// TODO: Fix window not defined
	// "searchbarusage.tsx",
	// "sectionheaderusage.tsx",
	// "selectmodalusage.tsx",
	// "servicesusage.tsx",
	// "shapeblurusage.tsx",
	// "sharebuttonusage.tsx",
	// "shuffleherousage.tsx",
	// "sidebarusage.tsx",
	// TODO: Fix rendering object
	// "sideivdeousage.tsx",
	// "simplefooterusage.tsx",
	// "simplegridusage.tsx",
	// "slidebuttonusage.tsx",
	// "slidingnumbersusage.tsx",
	// "smokeycursorusage.tsx",
	// "smoothcursorusage.tsx",
	// "smoothsliderusage.tsx",
	// "snowflakesusage.tsx",
	"sociallinksusage.tsx",
	"sparklesusage.tsx",
	"spinnerusage.tsx",
	"spotlightborderusage.tsx",
	"spotlightusage.tsx",
	// TODO: Fix
	// "springelementusage.tsx",
	// "springfaqusage.tsx",
	// "springmodalusage.tsx",
	// "stackedcarouselusage.tsx",
	// "stackingcardsusage.tsx",
	// "starfieldwrapperusage.tsx",
	"stickerpeelusage.tsx",
	"stickyscrollrevealusage.tsx",
	"stripeaccordionusage.tsx",
	"stripespreloaderusage.tsx",
	"swapcolumnfeaturesusage.tsx",
	"tableOfContentusage.tsx",
	"tableusage.tsx",
	"tabsusage.tsx",
	"targetcursorusage.tsx",
	"terminalusage.tsx",
	"textalongpathusage.tsx",
	"textanimateusage.tsx",
	"textblockproximityusage.tsx",
	"textcursorproximityusage.tsx",
	"textcursorusage.tsx",
	"textcurveusage.tsx",
	"textenhancedusage.tsx",
	"textfocususage.tsx",
	"textgradientusage.tsx",
	"texthighlighterusage.tsx",
	"texthoverusage.tsx",
	// "textmorphusage.tsx",
	// "textparallaxcontentusage.tsx",
	// "textproximityusage.tsx",
	// "textrevealusage.tsx",
	"textrollusage.tsx",
	"textrotateusage.tsx",
	"textsplitusage.tsx",
	// "texttrailusage.tsx",
	"texttypeusage.tsx",
	"textunderlineusage.tsx",
	"themetoggleusage.tsx",
	"threadsusage.tsx",
	"threebounceloaderusage.tsx",
	"threedotloaderusage.tsx",
	"tilesbackgroundusage.tsx",
	"timelineusage.tsx",
	"tooltipusage.tsx",
	"tracingbeamusage.tsx",
	"typewritertestimonialsusage.tsx",
	"underlinetobackgroundusage.tsx",
	"usagereplicationusage.tsx",
	"verticalcutrevealusage.tsx",
	"videobuttonusage.tsx",
	"videoherousage.tsx",
	"videoplayer2usage.tsx",
	"videoplayerusage.tsx",
	"videoviewerusage.tsx",
	"viewlistusage.tsx",
	"wobblecardusage.tsx",
	"wordtornadousage.tsx",
	"zoomblurcardusage.tsx",
];

export default function HomePage() {
	const [hovered, setHovered] = useState<string | null>(null);

	const [items, setItems] = useState([""]);
	const [subcategories, setSubcategories] = useState([""]);

	return (
		<main className="min-h-screen bg-zinc-950 text-white p-8">
			<div className="flex h-full">
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto h-fit">
					{Object.entries(categories).map(([category, subcategories]) => {
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

						const categoryTotal = components.filter(
							(comp) =>
								comp.includes(category) ||
								!!subcategories
									.map((filter) => comp.includes(filter))
									.filter((item) => !!item).length
						);
						return (
							<Link
								key={category}
								onMouseEnter={() => {
									setHovered(category);
									setItems(categoryTotal);
									setSubcategories(subcategories);
								}}
								onMouseLeave={() => {
									setHovered(null);
									setItems([]);
									setSubcategories([]);
								}}
								href={href}
								className={`rounded-2xl px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md ${
									category === "All" ? "text-red-400" : "text-white"
								}`}
							>
								{category === "All" && hovered === "All"
									? "will cause lag"
									: category}
								<br />
								{category === "All"
									? components.length
									: categoryTotal.length}
							</Link>
						);
					})}
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
