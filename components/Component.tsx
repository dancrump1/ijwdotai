"use client";

import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";

import CircularBarsSpinnerLoader from "@/registry/open-source/circular-bars-loader";
import CodeBlock from "@/registry/open-source/code-block";
import { ICON_LIST } from "@/registry/open-source/icons/index";
import { cn } from "@/registry/utilities/cn";
import { filterOptions } from "@/registry/utilities/example_data";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { ImperativePanelHandle } from "react-resizable-panels";

import { OpenInV0Button } from "./open-in-v0-button";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "./ui/resizable";
import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";

function useOnScreen(threshold = 0.001, rootMargin = "100px") {
	const ref = useRef(null);
	const [isIntersecting, setIntersecting] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIntersecting(entry.isIntersecting),
			{
				threshold,
				rootMargin, // Trigger before the element enters the viewport
			}
		);

		if (ref.current) {
			observer.observe(ref.current);
		}

		return () => observer.disconnect();
	}, [threshold, rootMargin]);

	return [ref, isIntersecting];
}

function LazyComponentWrapper({
	children,
	title,
	containerRef,
	collapsed,
	fullScreen,
}) {
	const [triggerRef, isVisible] = useOnScreen();
	const measureRef = useRef(null);
	const [height, setHeight] = useState(null);
	const [hasMeasured, setHasMeasured] = useState(false);

	// Measure height before showing
	useEffect(() => {
		if (!hasMeasured && measureRef.current) {
			const observer = new ResizeObserver(([entry]) => {
				setHeight(entry.contentRect.height);
				setHasMeasured(true);
			});

			observer.observe(measureRef.current);
			return () => {
				observer.disconnect();
			};
		}
	}, [hasMeasured]);

	const childWithRef = containerRef
		? React.cloneElement(children, { containerRef: containerRef })
		: children;

	return (
		<div ref={triggerRef} className="w-full h-full">
			{!isVisible && !hasMeasured && (
				<>
					<div
						ref={measureRef}
						style={{
							visibility: "hidden",
							position: "absolute",
							pointerEvents: "none",
							zIndex: -1,
						}}
					>
						{children}
					</div>
					<div className="flex mx-auto justify-center flex-col content-center">
						<span>Loading! Please be patient...</span>
						<CircularBarsSpinnerLoader />
					</div>
				</>
			)}

			{(isVisible || hasMeasured) && (
				<div
					className={cn(
						"flex items-center justify-center relative h-fit w-full",
						{
							"max-h-[5vh] !min-h-6 overflow-hidden":
								collapsed.includes(
									title
										.replaceAll(" ", "")
										.replaceAll("-", "")
										.toLowerCase()
								) && !fullScreen,
						}
					)}
					style={{ minHeight: height || undefined }}
				>
					{isVisible ? childWithRef : null}
				</div>
			)}
		</div>
	);
}

interface BlockViewState {
	view: "preview" | "code";
	size: "desktop" | "tablet" | "mobile";
}

const Component = ({
	children,
	title,
	content,
	code,
	filename,
	containerRef,
	blockConfig = [],
	tags = [],
	selectedFilters = [],
	setComponentCount,
	gridView,
	subfolder,
	collapsed,
	setCollapsed,
	java_data,
	...props
}) => {
	const [showCode, setShowCode] = useState(false);

	const [state, setState] = useState<BlockViewState>({
		view: "preview",
		size: "desktop",
	});
	const resizablePanelRef = useRef<ImperativePanelHandle>(null);

	const [textContent, setTextContent] = useState("");
	const [textFilename, setTextFilename] = useState("");

	const allTags = [
		...tags,
		...filterOptions.filter((filter) =>
			title.toLowerCase().includes(filter.label.toLowerCase())
		),
	];

	const mungedTitle = title
		.split(" ")
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");

	useEffect(() => {
		setComponentCount((prev) =>
			prev.includes(mungedTitle) ? prev : [...prev, mungedTitle]
		);

		return () =>
			setComponentCount((prev) => prev.filter((item) => item !== title));
	}, []);

	const componentIsCollapsed = collapsed.includes(
		mungedTitle.replaceAll(" ", "").replaceAll("-", "").toLowerCase()
	);

	const [fullScreen, setFullScreen] = useState(false);
	const ExpandComponent = ICON_LIST.find(
		({ name }) => "chevrons-up-down" === name
	)!.icon;
	const CollapseComponent = ICON_LIST.find(
		({ name }) => "chevrons-down-up" === name
	)!.icon;

	if (
		!!selectedFilters.length &&
		!selectedFilters.find((filter) => {
			return allTags
				.map((tag) => tag?.label)
				.filter((item) => !!item)
				.find((item) => item.includes(filter));
		})
	) {
		return null;
	}

	const handleSizeChange = (value: string) => {
		if (value) {
			setState((prev) => ({
				...prev,
				size: value as "desktop" | "tablet" | "mobile",
			}));

			if (resizablePanelRef?.current) {
				switch (value) {
					case "desktop":
						resizablePanelRef.current.resize(100);
						break;
					case "tablet":
						resizablePanelRef.current.resize(60);
						break;
					case "mobile":
						resizablePanelRef.current.resize(30);
						break;
				}
			}
		}
	};

	return (
		<section
			{...props}
			className={cn(
				`component-container flex flex-col border rounded-lg p-4 relative`,
				{
					border: !!gridView,
					"!min-h-0 h-[15vh] overflow-hidden":
						componentIsCollapsed && !fullScreen,
					"col-span-2": gridView == 2 && fullScreen,
					"col-span-3": gridView == 3 && fullScreen,
					"col-span-4": gridView == 4 && fullScreen,
				}
			)}
			data-view={state.view}
			id={mungedTitle.replaceAll(" ", "").replaceAll("-", "").toLowerCase()}
			key={mungedTitle.replaceAll(" ", "").replaceAll("-", "").toLowerCase()}
		>
			<span className="flex items-center mb-3 flex-wrap">
				<Link
					href={"/type/" + title.toLowerCase()}
					className="text-xl sm:pl-3"
				>
					{title}
				</Link>
				<button onClick={() => setShowCode(!showCode)} className="ml-auto">
					{showCode ? "preview" : "code"}
				</button>
				<div className="ml-auto hidden h-8 items-center gap-1.5 rounded-md border p-0.5 shadow-none lg:flex">
					<ToggleGroup
						type="single"
						value={state.size}
						className="gap-0.5"
						onValueChange={(value) => {
							handleSizeChange(value);
						}}
					>
						<ToggleGroupItem
							value="desktop"
							className="h-[25px] w-[25px] min-w-0 rounded-sm p-0"
							title="Desktop"
							data-umami-event="Set Preview Desktop"
						>
							<Monitor className="h-4 w-4" />
						</ToggleGroupItem>
						<ToggleGroupItem
							value="tablet"
							className="h-[25px] w-[25px] min-w-0 rounded-sm p-0"
							title="Tablet"
							data-umami-event="Set Preview Tablet"
						>
							<Tablet className="h-4 w-4" />
						</ToggleGroupItem>
						<ToggleGroupItem
							value="mobile"
							className="h-[25px] w-[25px] min-w-0 rounded-sm p-0"
							title="Mobile"
							data-umami-event="Set Preview Mobile"
						>
							<Smartphone className="h-4 w-4" />
						</ToggleGroupItem>
					</ToggleGroup>
				</div>
				<OpenInV0Button
					name={title.replaceAll(" ", "").toLowerCase()}
					className="w-fit mx-4"
				/>

				<button onClick={() => setFullScreen(!fullScreen)}>
					{fullScreen ? <CollapseComponent /> : <ExpandComponent />}
				</button>
				<input
					type="checkbox"
					onChange={() =>
						setCollapsed((prev) =>
							prev.includes(
								title
									.replaceAll(" ", "")
									.replaceAll("-", "")
									.toLowerCase()
							)
								? prev.filter(
										(item) =>
											item !==
											mungedTitle
												.replaceAll(" ", "")
												.replaceAll("-", "")
												.toLowerCase()
									)
								: [
										...prev,
										mungedTitle
											.replaceAll(" ", "")
											.replaceAll("-", "")
											.toLowerCase(),
									]
						)
					}
					checked={componentIsCollapsed}
				/>
			</span>
			<hr className="w-full mb-3" />
			{showCode ? (
				<div className="grid w-full gap-4">
					<CodeBlock
						code={content}
						filename={textFilename}
						// tabs={blockConfig.tabs?.map((config, i) => ({
						// 	...config,
						// 	code: textContent[i],
						// 	name: textFilename[i],
						// }))}
						tabs={[]}
					/>
				</div>
			) : (
				<ResizablePanelGroup
					direction="horizontal"
					className="relative z-10"
				>
					<ResizablePanel
						ref={resizablePanelRef}
						className="relative rounded-lg border border-accent bg-background"
						defaultSize={100}
						minSize={30}
					>
						<LazyComponentWrapper
							setComponentCount={setComponentCount}
							title={mungedTitle}
							containerRef={containerRef}
							collapsed={collapsed}
							fullScreen={fullScreen}
						>
							{children}
						</LazyComponentWrapper>
					</ResizablePanel>
					<ResizableHandle className="relative hidden w-3 bg-transparent p-0 after:absolute after:right-0 after:top-1/2 after:h-8 after:w-[6px] after:-translate-y-1/2 after:-translate-x-px after:rounded-full after:bg-border after:transition-all after:hover:h-10 md:block" />

					<ResizablePanel defaultSize={0} minSize={0} />
				</ResizablePanelGroup>
			)}
		</section>
	);
};

export default Component;
