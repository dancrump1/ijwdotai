"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

import dynamic from "next/dynamic";

import Component from "@/components/Component";
import { cn } from "@/lib/utils";
import { ScrollIsland } from "@/registry/open-source/ScrollIsland";
import { filterOptions } from "@/registry/utils/example_data";
import { PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import {
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from "cmdk";
import {
	Bell,
	CheckIcon,
	ChevronDown,
	Command,
	HelpCircle,
	Mail,
	Plus,
	Star,
	XCircle,
	XIcon,
} from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { Popover } from "radix-ui";

import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

const ComponentLoading = () => {
	useEffect(() => {
		return () => {};
	}, []);

	return (
		<div
			role="status"
			className="flex w-full h-screen justify-center items-center"
		>
			<svg
				aria-hidden="true"
				className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
				viewBox="0 0 100 101"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
					fill="currentColor"
				/>
				<path
					d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
					fill="currentFill"
				/>
			</svg>
			<span className="sr-only">Loading...</span>
		</div>
	);
};

const components = [
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

export const ClientWrapper = ({
	files,
	slug,
}: {
	files: string[];
	slug?: string;
}) => {
	const matchingComponents = components.filter((item) => {
		return !!slug ? item.includes(slug) : true;
	});
	const componentImports = matchingComponents.map((item) => {
		return dynamic(
			() => import("@/components/usages/" + item.replace(".tsx", "")),
			{
				loading: ComponentLoading,
			}
		);
	});
	const containerRef = useRef(null);

	const [basic, setBasic] = useState(false);

	const { scrollYProgress } = useScroll({ container: containerRef });

	const [componentCount, setComponentCount] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [titleEls, setTitleEls] = useState<HTMLElement[] | null>([]);
	const [percent, setPercent] = useState(0);
	const [currentTitle, setCurrentTitle] = useState("stack");
	const setupTitles = useCallback((node: HTMLDivElement) => {
		if (node) {
			const titleEls = Array.from(
				node.querySelectorAll(".component-container")
			) as HTMLElement[] | null;
			setTitleEls(
				!!titleEls
					? titleEls?.map((el) => el.children[0].children[0])
					: null
			);
		}
	}, []);

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		setPercent(Math.floor(latest * 100));
		titleEls.forEach((el, index) => {
			const top = el.getBoundingClientRect().top;
			if (top >= 0 && top < 32) {
				setCurrentTitle(el.textContent || "");
			}
		});
	});
	const [isOpen, setIsOpen] = useState(false);

	const handleIsOpen = () => {
		setIsOpen(!isOpen);
	};

	const [gridView, setGridView] = useState(false);

	const [collapsed, setCollapsed] = useState([]);
	const [allElements, setAllElements] = useState<HTMLElement[] | null>([]);
	useEffect(() => {
		const titleEls = Array.from(
			document.querySelectorAll(".component-container")
		) as HTMLElement[] | null;

		setAllElements(!!titleEls ? titleEls.map((el) => el.id) : null);
	}, []);

	useEffect(() => {
		const el = document.getElementById("collapse-all") as HTMLInputElement;
		if (!collapsed.length) {
			el.indeterminate = false;
		} else if (
			!!collapsed.length &&
			[...new Set([...allElements, ...collapsed])].length !==
				allElements.length
		) {
			el.indeterminate = true;
		} else if (
			!!collapsed.length &&
			[...new Set([...allElements, ...collapsed])].length ===
				allElements.length
		) {
			el.indeterminate = false;
		}
	}, [allElements, collapsed]);

	// Main FAB state
	const [isExpanded, setIsExpanded] = useState(false);
	const [hoveredButton, setHoveredButton] = useState<string | null>(null);

	const actionButtons = [
		{
			id: "collapse",
			icon: Mail,
			label: "Collapse All",
			color: "bg-blue-500 hover:bg-blue-600",
			position: "bottom-20 right-2",
		},
		{
			id: "grid",
			icon: Star,
			label: "Grid Size",
			color: "bg-green-500 hover:bg-green-600",
			position: "bottom-16 right-16",
		},
		{
			id: "filters",
			icon: HelpCircle,
			label: "Filters",
			color: "bg-orange-500 hover:bg-orange-600",
			position: "bottom-2 right-16",
		},
		{
			id: "type",
			icon: Bell,
			label: "Component Types",
			color: "bg-purple-500 hover:bg-purple-600",
			position: "bottom-2 right-2",
		},
	];

	const renderForm = (buttonId: string) => {
		switch (buttonId) {
			case "collapse":
				return (
					<>
						<div className="flex flex-col">
							<input
								type="checkbox"
								id="collapse-all"
								title="collapse all"
								className="w-[25px]"
								checked={allElements.length === collapsed.length}
								onChange={(e) => {
									if (
										collapsed.length &&
										[...new Set([...collapsed, ...allElements])]
											.length !== collapsed.length
									) {
										setCollapsed([]);
									} else if (
										[...new Set([...collapsed, ...allElements])]
											.length === collapsed.length
									) {
										setCollapsed([]);
									} else {
										const containers = [
											...document.querySelectorAll(
												".component-container"
											),
										] as HTMLElement[];

										setCollapsed(containers.map((el) => el.id));
									}
								}}
							/>
						</div>
					</>
				);
			case "grid":
				return (
					<div className="flex flex-col">
						<ToggleGroup
							className="inline-flex space-x-px rounded border"
							type="single"
							defaultValue="1"
							aria-label="Components per row"
							onClick={(e) => setGridView(e.target.textContent)}
						>
							<ToggleGroupItem value="1" aria-label="1">
								1
							</ToggleGroupItem>

							<ToggleGroupItem value="2" aria-label="2">
								2
							</ToggleGroupItem>
							<ToggleGroupItem value="3" aria-label="3">
								3
							</ToggleGroupItem>
							<ToggleGroupItem value="4" aria-label="4">
								4
							</ToggleGroupItem>
						</ToggleGroup>
					</div>
				);
			case "filters":
				return (
					<div className="flex flex-col">
						{/* <MultiSelect
							options={filterOptions.sort((a, b) =>
								a.label.localeCompare(b.label)
							)}
							onValueChange={setSelectedFilters}
							popoverClassname="bg-black z-[55]"
							className="z-[55]"
						/> */}
					</div>
				);
			case "type":
				return (
					<div className="flex flex-col">
						<ToggleGroup
							className="inline-flex space-x-px rounded border"
							type="single"
							defaultValue="right"
							aria-label="component complexity"
							onClick={() => setBasic(!basic)}
						>
							<ToggleGroupItem value="left" aria-label="Static">
								Static
							</ToggleGroupItem>

							<ToggleGroupItem value="right" aria-label="Complex">
								Animated
							</ToggleGroupItem>
						</ToggleGroup>
					</div>
				);
			default:
				return null;
		}
	};

	const [hideHeader, setHideHeader] = useState(false);

	return (
		<div key="client-wrapper">
			<header
				className={cn(
					"flex flex-col gap-1 sticky top-0 bg-background z-50",
					hideHeader && "hidden"
				)}
			>
				<h1 className="text-3xl font-bold tracking-tight">
					{componentCount?.length} examples vs {files.length} total files
				</h1>
				<p className="text-muted-foreground">
					Collection of OOS React components using tailwind and motion.
				</p>
				<p className="text-muted-foreground">
					I recommend Collapsing All and setting components-per-row to 3 or
					4. Once collapsed, you can expand individual components
					vertically and horizontally with controls on each component card.
				</p>
				<p className="text-muted-foreground">
					Live use of 200+ components. Expect some lag and maxed out
					hardware usage.
				</p>
				<button onClick={() => setHideHeader(true)}>x</button>
			</header>

			<main className="flex flex-col flex-1 gap-8">
				<section
					className={
						"rounded-md w-full flex flex-col md:flex-row shrink-1 overflow-y-auto overflow-x-hidden scroll-container"
					}
					ref={containerRef}
				>
					<ScrollIsland
						gridView={gridView}
						ref={setupTitles}
						containerRef={containerRef}
					>
						{basic ? (
							<>
								{/* <Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.CARD
										),
									]}
									selectedFilters={selectedFilters}
									title="Basic Card"
								>
									<BasicCard />
								</Component>
								<Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.CARD
										),
									]}
									selectedFilters={selectedFilters}
									title="Basic Card"
								>
									<CardWithImages />
								</Component> */}

								{/* <Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TRANSITIONS
										),
									]}
									selectedFilters={selectedFilters}
									title="dual ring loader"
								>
									<DualRingSpinnerLoader />
								</Component> */}

								{/* <Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TRANSITIONS
										),
									]}
									selectedFilters={selectedFilters}
									title="circular bars loader"
								>
									<CircularBarsSpinnerLoader />
								</Component> */}
								{/* <Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TRANSITIONS
										),
									]}
									selectedFilters={selectedFilters}
									title="three bounce loader"
								>
									<ThreeDotSimpleLoader />
								</Component> */}
								{/* <Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.TRANSITIONS
										),
									]}
									selectedFilters={selectedFilters}
									title="three dot loader"
								>
									<ThreeDotLoaderGrowing />
								</Component> */}
								{/* <Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() === "preloaders"
										),
									]}
									selectedFilters={selectedFilters}
									title="Stripes Preloader"
								>
									<VerticalTiles rerun>
										<span>Some content</span>
									</VerticalTiles>
								</Component> */}
								{/* <Component
									allFilters={filterOptions}
									collapsed={collapsed}
									setCollapsed={setCollapsed}
									gridView={gridView}
									setComponentCount={setComponentCount}
									tags={[
										filterOptions.find(
											(filter) =>
												filter.label.toLowerCase() ===
												filter_constants.ACCORDION
										),
									]}
									selectedFilters={selectedFilters}
									title="Basic Accordion"
								>
									<AccordionBasic />
								</Component> */}
							</>
						) : (
							<>
								{componentImports.map((ComponentImported, i) => {
									return (
										<Component
											key={"custom-oop-component" + i}
											allFilters={filterOptions}
											collapsed={collapsed}
											setCollapsed={setCollapsed}
											gridView={gridView}
											setComponentCount={setComponentCount}
											tags={[
												filterOptions.find(
													(filter) =>
														filter.label.toLowerCase() === "card"
												),
											]}
											selectedFilters={selectedFilters}
											title={matchingComponents[i].replace(
												"usage.tsx",
												""
											)}
											code={undefined}
											filename={undefined}
											containerRef={undefined}
											subfolder={undefined}
										>
											<ComponentImported />
										</Component>
									);
								})}
								<section>
									shopify logo wall w/ spotlight on hover
								</section>
								<section>Full Screen Hero video player / image</section>
								<section>
									https://spencergabor.work/about footer
								</section>
							</>
						)}
					</ScrollIsland>
				</section>
			</main>
			<div
				className="fixed bottom-6 right-6 z-50"
				onMouseEnter={() => setIsExpanded(true)}
				onMouseLeave={() => setIsExpanded(false)}
			>
				{/* Action Buttons */}
				{actionButtons.map((button, index) => {
					const Icon = button.icon;
					return (
						<div key={button.id} className="relative">
							<div
								className=""
								onMouseLeave={() => setHoveredButton(null)}
							>
								{/* Form Card */}
								<div
									className={`
                  transition-all duration-300 ease-in-out z-50 absolute left-0 bg-black
                  ${hoveredButton === button.id ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none"}
                `}
								>
									{renderForm(button.id)}
								</div>

								{/* Action Button */}
								<Button
									size="sm"
									className={`
                  h-12 w-12 rounded-full shadow-lg transition-all duration-300 ease-in-out
                  ${button.color}
                  ${isExpanded ? "opacity-100 scale-100" : "opacity-0 scale-0"}
                `}
									style={{
										transitionDelay: isExpanded
											? `${index * 50}ms`
											: "0ms",
									}}
									onMouseEnter={() => setHoveredButton(button.id)}
								>
									{button.label}
								</Button>
							</div>
						</div>
					);
				})}

				{/* Main FAB */}
				<Button
					size="lg"
					onClick={() => setIsExpanded(!isExpanded)}
					className={`
            h-14 w-14 rounded-full shadow-lg transition-all duration-300 ease-in-out
            ${isExpanded ? "bg-red-500 hover:bg-red-600 rotate-45" : "bg-blue-500 hover:bg-blue-600"}
          `}
				>
					<Plus className="h-6 w-6" />
				</Button>
			</div>
		</div>
	);
};

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	/**
	 * An array of option objects to be displayed in the multi-select component.
	 * Each option object has a label, value, and an optional icon.
	 */
	options: {
		/** The text to display for the option. */
		label: string;
		/** The unique value associated with the option. */
		value: string;
		/** Optional icon component to display alongside the option. */
		icon?: React.ComponentType<{ className?: string }>;
		disable?: boolean;
	}[];

	/**
	 * Callback function triggered when the selected values change.
	 * Receives an array of the new selected values.
	 */
	onValueChange: (value: string[]) => void;

	/** The default selected values when the component mounts. */
	defaultValue?: string[];

	/**
	 * Placeholder text to be displayed when no values are selected.
	 * Optional, defaults to "Select options".
	 */
	placeholder?: string;

	/**
	 * Animation duration in seconds for the visual effects (e.g., bouncing badges).
	 * Optional, defaults to 0 (no animation).
	 */
	animation?: number;

	/**
	 * Maximum number of items to display. Extra selected items will be summarized.
	 * Optional, defaults to 3.
	 */
	maxCount?: number;

	/**
	 * The modality of the popover. When set to true, interaction with outside elements
	 * will be disabled and only popover content will be visible to screen readers.
	 * Optional, defaults to false.
	 */
	modalPopover?: boolean;

	/**
	 * If true, renders the multi-select component as a child of another component.
	 * Optional, defaults to false.
	 */
	asChild?: boolean;

	/**
	 * Additional class names to apply custom styles to the multi-select component.
	 * Optional, can be used to add custom styles.
	 */
	className?: string;
	popoverClass?: string;
	showall?: boolean;
}

export const MultiSelect = React.forwardRef<
	HTMLButtonElement,
	MultiSelectProps
>(
	(
		{
			options,
			onValueChange,
			defaultValue = [],
			placeholder = "Select options",
			animation = 0,
			maxCount = 3,
			modalPopover = false,
			asChild = false,
			className,
			popoverClass,
			showall = false,
			...props
		},
		ref
	) => {
		const [selectedValues, setSelectedValues] =
			useState<string[]>(defaultValue);
		const [isPopoverOpen, setIsPopoverOpen] = useState(false);

		const handleInputKeyDown = (
			event: React.KeyboardEvent<HTMLInputElement>
		) => {
			if (event.key === "Enter") {
				setIsPopoverOpen(true);
			} else if (event.key === "Backspace" && !event.currentTarget.value) {
				const newSelectedValues = [...selectedValues];
				newSelectedValues.pop();
				setSelectedValues(newSelectedValues);
				onValueChange(newSelectedValues);
			}
		};

		const toggleOption = (option: string) => {
			const newSelectedValues = selectedValues.includes(option)
				? selectedValues.filter((value) => value !== option)
				: [...selectedValues, option];
			setSelectedValues(newSelectedValues);
			onValueChange(newSelectedValues);
		};

		const handleClear = () => {
			setSelectedValues([]);
			onValueChange([]);
		};

		const handleTogglePopover = () => {
			setIsPopoverOpen((prev) => !prev);
		};

		const clearExtraOptions = () => {
			const newSelectedValues = selectedValues.slice(0, maxCount);
			setSelectedValues(newSelectedValues);
			onValueChange(newSelectedValues);
		};
		const filteredOptions = options.filter((option) => !option.disable);
		const toggleAll = () => {
			if (selectedValues.length === filteredOptions.length) {
				handleClear();
			} else {
				const allValues = filteredOptions.map((option) => option.value);
				setSelectedValues(allValues);
				onValueChange(allValues);
			}
		};

		return (
			<Popover
				open={isPopoverOpen}
				onOpenChange={setIsPopoverOpen}
				modal={modalPopover}
			>
				<PopoverTrigger asChild>
					<Button
						ref={ref}
						{...props}
						onClick={handleTogglePopover}
						className={cn(
							"flex w-fit p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-background hover:bg-background",
							className
						)}
					>
						{selectedValues.length > 0 ? (
							<div className="flex justify-between items-center w-full">
								<div className="flex flex-wrap items-center  gap-1 p-1">
									{(showall
										? selectedValues
										: selectedValues.slice(0, maxCount)
									).map((value) => {
										const option = options.find(
											(o) => o.value === value
										);
										const IconComponent = option?.icon;
										return (
											<div
												key={value}
												className={cn(
													"inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold  bg-primary text-primary-foreground  "
												)}
											>
												{IconComponent && (
													<IconComponent className="h-4 w-4 mr-2" />
												)}
												{option?.label}
												<XCircle
													className="ml-2 h-4 w-4 cursor-pointer"
													onClick={(event) => {
														event.stopPropagation();
														toggleOption(value);
													}}
												/>
											</div>
										);
									})}
									{!showall && selectedValues.length > maxCount && (
										<div
											className={cn(
												"bg-primary-foreground inline-flex items-center border px-2 py-0.5  rounded-full text-foreground border-foreground/1 hover:bg-transparent"
											)}
											style={{ animationDuration: `${animation}s` }}
										>
											{`+ ${selectedValues.length - maxCount} more`}
											<XCircle
												className="ml-2 h-4 w-4 cursor-pointer"
												onClick={(event) => {
													event.stopPropagation();
													clearExtraOptions();
												}}
											/>
										</div>
									)}
								</div>
								<div className="flex items-center justify-between">
									<XIcon
										className="h-4 mx-2 cursor-pointer text-muted-foreground"
										onClick={(event) => {
											event.stopPropagation();
											handleClear();
										}}
									/>
									{/* <Separator
                    orientation="vertical"
                    className="flex min-h-6 h-full"
                  /> */}
									<ChevronDown className="h-4 mx-2 cursor-pointer text-muted-foreground" />
								</div>
							</div>
						) : (
							<div className="flex items-center justify-between w-full mx-auto">
								<span className="text-sm text-muted-foreground mx-3">
									{placeholder}
								</span>
								<ChevronDown className="h-4 cursor-pointer text-muted-foreground mx-2" />
							</div>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent
					className={cn("w-auto p-0", popoverClass)}
					align="start"
					onEscapeKeyDown={() => setIsPopoverOpen(false)}
				>
					<Command>
						<CommandInput
							placeholder="Search..."
							onKeyDown={handleInputKeyDown}
						/>
						<CommandList>
							<CommandEmpty>No results found.</CommandEmpty>
							<CommandGroup>
								<div className="flex items-center justify-between">
									{selectedValues.length > 0 && (
										<>
											<CommandItem
												onSelect={handleClear}
												className="flex-1 justify-center cursor-pointer border-r"
											>
												Clear
											</CommandItem>
										</>
									)}
									<CommandItem
										key="all"
										onSelect={toggleAll}
										className="cursor-pointer"
										disabled={false}
									>
										<div
											className={cn(
												"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
												selectedValues.length ===
													filteredOptions.length
													? "bg-primary text-primary-foreground"
													: "opacity-50 [&_svg]:invisible"
											)}
										>
											<CheckIcon className="h-4 w-4" />
										</div>
										<span>(Select All)</span>
									</CommandItem>
									<CommandItem
										onSelect={() => setIsPopoverOpen(false)}
										className="justify-center cursor-pointer max-w-full"
									>
										Close
									</CommandItem>
								</div>
							</CommandGroup>

							<CommandSeparator />
							<CommandGroup className="columns-4">
								{options.map((option) => {
									const isSelected = selectedValues.includes(
										option.value
									);
									const isDisabled = false; // Check if option is disabled

									return (
										<CommandItem
											key={option.value}
											onSelect={() => toggleOption(option.value)}
											className={cn(
												"cursor-pointer",
												isDisabled &&
													"opacity-50 cursor-not-allowed" // Disable styling
											)}
										>
											<div
												className={cn(
													"mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
													isSelected
														? "bg-primary text-primary-foreground"
														: "opacity-50 [&_svg]:invisible"
												)}
											>
												{!isDisabled && (
													<CheckIcon className="h-4 w-4" />
												)}
											</div>
											{option.icon && (
												<option.icon
													className={cn(
														"mr-2 h-4 w-4",
														isDisabled
															? "text-muted-foreground"
															: ""
													)}
												/>
											)}
											<span>{option.label}</span>
										</CommandItem>
									);
								})}
							</CommandGroup>
						</CommandList>
					</Command>
				</PopoverContent>
			</Popover>
		);
	}
);
