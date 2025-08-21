"use client";

import React, {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import Component from "@/components/Component";
import { ScrollIsland } from "@/registry/open-source/scroll-island";
import { cn } from "@/registry/utilities/cn";
import { filterOptions } from "@/registry/utilities/example_data";
import { Bell, HelpCircle, Mail, Plus, Star } from "lucide-react";
import { useMotionValueEvent, useScroll } from "motion/react";

import { MultiSelect } from "./MultiSelect";
import { Button } from "./ui/button";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

export const ComponentLoading = () => {
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

const priorityOrder = [
	"card-swap",
	"carousel-circle",
	"animated-checkbox",
	"circle-text",
	"cursor-carousel",
	"falling-text",
	"gravity",
	"following-eyes",
	"cursor-follow",
	"ghost-label",
	"horizontal-scroll-gallery",
	"horizontal-scroll",
	"horizontal-scroll-2",
	"gif-text",
	"hover-gallery-",
	"hover-squares",
	"letter-hover",
	"lens",
	"media-between-text",
	"mouse-image-trail",
	"pixel-image",
	"scroll-horizontal",
	"text-along-path",
	"opposite-scroll",
	"parallax-floating",
	"stacking-cards",
	"target-cursor",
	"text-curve",
	"type-text",
	"3d-card",
];

const priorityMap = new Map(priorityOrder.map((name, i) => [name, i]));

export const ClientWrapper = ({
	files,
	params,
}: {
	files: { name: string; content: string }[];
	params?: any;
}) => {
	const searchParams = useSearchParams();

	const searchFilters = useMemo(
		() => searchParams.getAll("subcategory"),
		[searchParams]
	);
	const containerRef = useRef(null);
	const [filteredFiles, setFilteredFiles] = useState([]);

	const [basic, setBasic] = useState(false);

	useEffect(() => {
		setFilteredFiles(
			files
				.filter(({ name }) =>
					basic ? name.includes("comp-") : !name.includes("comp-")
				)
				.filter(({ name }) => {
					return !!params?.slug
						? name.includes(params.slug) ||
								!!searchFilters
									.map((filter) => name.includes(filter))
									.filter((item) => !!item).length
						: true;
				})
				.sort((a, b) => {
					const aPriority = priorityMap.get(a.name.replace(".json", ""));
					const bPriority = priorityMap.get(b.name.replace(".json", ""));

					// Both in priority list → sort by order in array
					if (aPriority !== undefined && bPriority !== undefined) {
						return aPriority - bPriority;
					}

					// Only A is priority → A comes first
					if (aPriority !== undefined) return -1;

					// Only B is priority → B comes first
					if (bPriority !== undefined) return 1;

					// Neither is priority → alphabetical
					return a.name.localeCompare(b.name);
				})
		);
	}, [files, params?.slug, searchFilters, basic]);

	const componentImports = filteredFiles
		.map(({ name }) => {
			if (name.includes("comp-")) {
				return null;
			}

			return dynamic(
				() =>
					import(
						"@/components/usages/" +
							name.replace(".json", "").replaceAll("-", "") +
							"usage.tsx"
					),
				{
					loading: ComponentLoading,
					ssr:
						name.toLowerCase().includes("select-modal") ||
						name.toLowerCase().includes("dither") ||
						name.toLowerCase().includes("text-rotate") ||
						name.toLowerCase().includes("flipped-menu")
							? false
							: true,
				}
			);
		})
		.filter(Boolean);

	const basicImports = filteredFiles.map(({ name }) => {
		if (!name.includes("comp-")) {
			return null;
		}

		return dynamic(
			() => import("@/registry/basic/" + name.replace(".json", ".tsx")),
			{
				loading: ComponentLoading,
			}
		);
	});

	const { scrollYProgress } = useScroll({ container: containerRef });

	const [componentCount, setComponentCount] = useState([]);
	const [selectedFilters, setSelectedFilters] = useState([]);
	const [titleEls, setTitleEls] = useState<HTMLElement[] | null>([]);
	const [percent, setPercent] = useState(0);
	const [currentTitle, setCurrentTitle] = useState("stack");
	const setupTitles = useCallback(
		(node: HTMLDivElement) => {
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
		},
		[filteredFiles]
	);

	useMotionValueEvent(scrollYProgress, "change", (latest) => {
		setPercent(Math.floor(latest * 100));
		titleEls.forEach((el, index) => {
			const top = el.getBoundingClientRect().top;
			if (top >= 0 && top < 32) {
				setCurrentTitle(el.textContent || "");
			}
		});
	});

	const [gridView, setGridView] = useState(false);

	const [collapsed, setCollapsed] = useState([]);
	const [allElements, setAllElements] = useState<HTMLElement[] | null>([]);
	useEffect(() => {
		const titleEls = Array.from(
			document.querySelectorAll(".component-container")
		) as HTMLElement[] | null;

		setAllElements(!!titleEls ? titleEls.map((el) => el.id) : null);
	}, [filteredFiles]);

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
	}, [allElements, collapsed, filteredFiles]);

	// Main FAB state
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
			position: "bottom-16 right-32",
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
		{
			id: "return",
			icon: Bell,
			label: "Home",
			color: "bg-teal-500 hover:bg-purple-600",
			position: "bottom-24 right-2",
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
						<MultiSelect
							options={filterOptions.sort((a, b) =>
								a.label.localeCompare(b.label)
							)}
							onValueChange={setSelectedFilters}
							popoverClassname="bg-black z-[55]"
							className="z-[55]"
						/>
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
			case "return":
				return (
					<div className="flex flex-col">
						<Link href="/">Return to the beginning</Link>
					</div>
				);
			default:
				return null;
		}
	};

	return (
		<div key="client-wrapper">
			<Header componentCount={componentCount} files={files} />
			<main className="flex flex-col flex-1 gap-8">
				<section
					className={
						"rounded-md w-full flex flex-col md:flex-row shrink-1 overflow-y-auto overflow-x-hidden scroll-container"
					}
					ref={containerRef}
				>
					{/* <ScrollIsland
						gridView={gridView}
						ref={setupTitles}
						containerRef={containerRef}
					> */}
					{!filteredFiles.length && <span>loading</span>}
					<div
						className={cn("relative w-full grid grid-cols-1 gap-8", {
							"grid-cols-1": gridView === "1",
							"grid-cols-2": gridView === "2",
							"grid-cols-3": gridView === "3",
							"grid-cols-4": gridView === "4",
						})}
						ref={setupTitles}
					>
						{basic ? (
							<>
								{basicImports.map((ComponentImported, i) => {
									return (
										<Suspense
											key={"basic" + i}
											fallback={
												<span className="text-black dark:text-white">
													loading
												</span>
											}
										>
											<Component
												key={"custom-basic-component" + i}
												collapsed={collapsed}
												setCollapsed={setCollapsed}
												gridView={gridView}
												setComponentCount={setComponentCount}
												selectedFilters={selectedFilters}
												title={filteredFiles[i].name.replace(
													".json",
													""
												)}
												content={filteredFiles[i].content}
											>
												{!!ComponentImported ? (
													<ComponentImported />
												) : (
													<div>
														failed to load{" "}
														{filteredFiles[i].name.replace(
															".json",
															""
														)}
													</div>
												)}
											</Component>
										</Suspense>
									);
								})}
							</>
						) : (
							<>
								{componentImports.map((ComponentImported, i) => {
									return (
										<Suspense
											key={"dynamic" + i}
											fallback={
												<span className="text-black dark:text-white">
													loading
												</span>
											}
										>
											<Component
												key={"custom-oop-component" + i}
												collapsed={collapsed}
												setCollapsed={setCollapsed}
												gridView={gridView}
												setComponentCount={setComponentCount}
												selectedFilters={selectedFilters}
												title={filteredFiles[i].name.replace(
													".json",
													""
												)}
												content={filteredFiles[i].content}
											>
												{!!ComponentImported ? (
													<ComponentImported />
												) : (
													<div>
														failed to load{" "}
														{filteredFiles[i].name.replace(
															".json",
															""
														)}
													</div>
												)}
											</Component>
										</Suspense>
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
					</div>
					{/* </ScrollIsland> */}
				</section>
			</main>
			<FAB
				actionButtons={actionButtons}
				setHoveredButton={setHoveredButton}
				hoveredButton={hoveredButton}
				renderForm={renderForm}
			/>
		</div>
	);
};

const FAB = ({
	actionButtons,
	setHoveredButton,
	hoveredButton,
	renderForm,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);

	return (
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
						<div className="" onMouseLeave={() => setHoveredButton(null)}>
							{/* Form Card */}
							<div
								className={`
                  transition-all duration-300 ease-in-out z-50 absolute ${index === 0 ? "left-0" : "-left-16"} bg-black
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
	);
};

const Header = ({ componentCount, files }) => {
	const [hideHeader, setHideHeader] = useState(false);

	return (
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
				I recommend Collapsing All and setting components-per-row to 3 or 4.
				Once collapsed, you can expand individual components vertically and
				horizontally with controls on each component card.
			</p>
			<p className="text-muted-foreground">
				Live use of 200+ components. Expect some lag and maxed out hardware
				usage.
			</p>
			<button onClick={() => setHideHeader(true)}>x</button>
		</header>
	);
};
