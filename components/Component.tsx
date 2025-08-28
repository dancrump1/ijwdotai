"use client";

import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";

import CircularBarsSpinnerLoader from "@/registry/open-source/circular-bars-loader";
import CodeBlock from "@/registry/open-source/code-block";
import { ICON_LIST } from "@/registry/open-source/icons/index";
import { SpringModal } from "@/registry/open-source/spring-modal";
import { cn } from "@/registry/utilities/cn";
import { filterOptions } from "@/registry/utilities/example_data";

import { OpenInV0Button } from "./open-in-v0-button";

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

	const [textContent, setTextContent] = useState("");
	const [textFilename, setTextFilename] = useState("");
	const [isOpen, setIsOpen] = useState(false);

	const [description, setDescription] = useState("test ste 123");
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);

	const handleUpdate = async () => {
		try {
			const res = await fetch(
				"http://localhost:8080/category/12/description",
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ description }),
				}
			);

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			const data = await res.json();
			setResponse(data);
			setError(null);
		} catch (err) {
			console.error(err);
			setError(err.message);
		}
	};

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
				<button
					onClick={() => setIsOpen(true)}
					className="bg-gradient-to-r from-violet-600 to-indigo-600 text-foreground font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
				>
					Open Modal
				</button>
				<SpringModal isOpen={isOpen} setIsOpen={setIsOpen}>
					<div style={{ padding: "1rem", maxWidth: "500px" }}>
						<h2>Update Category Description</h2>
						<input
							type="text"
							placeholder="New description"
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							style={{
								width: "100%",
								padding: "0.5rem",
								marginBottom: "0.5rem",
							}}
						/>
						<button
							onClick={handleUpdate}
							style={{ padding: "0.5rem 1rem", cursor: "pointer" }}
						>
							Update
						</button>

						{response && (
							<div style={{ marginTop: "1rem", color: "green" }}>
								<strong>Updated category:</strong>{" "}
								{JSON.stringify(response)}
							</div>
						)}

						{error && (
							<div style={{ marginTop: "1rem", color: "red" }}>
								<strong>Error:</strong> {error}
							</div>
						)}
					</div>
					);
				</SpringModal>
			</span>
			<hr className="w-full mb-3" />
			{showCode ? (
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
			) : (
				<LazyComponentWrapper
					setComponentCount={setComponentCount}
					title={mungedTitle}
					containerRef={containerRef}
					collapsed={collapsed}
					fullScreen={fullScreen}
				>
					{children}
				</LazyComponentWrapper>
			)}
		</section>
	);
};

export default Component;
