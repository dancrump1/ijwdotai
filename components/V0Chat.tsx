"use client";

import { Suspense, useEffect, useMemo, useState } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { useApiValidation } from "@/lib/useApiValidation";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarHeader,
	SidebarProvider,
} from "@/registry/basic/sidebar";
import ShareButton from "@/registry/open-source/share-button";

import ApiKeyError from "./ApiKeyError";
import { ComponentLoading } from "./ClientWrapper";
import Component from "./Component";
import ErrorDialog from "./ErrorDialog";
import PromptComponent from "./PromptComponent";
import RateLimitDialog from "./RateLimitDialog";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "./ui/accordion";

export default function V0Chat({
	files,
	categories,
}: {
	files: any;
	categories: any;
}) {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [projects, setProjects] = useState<any[]>([]);
	const [projectsLoaded, setProjectsLoaded] = useState(false);
	const [selectedProjectId, setSelectedProjectId] = useState("new");
	const [selectedChatId, setSelectedChatId] = useState("new");
	const [projectChats, setProjectChats] = useState<any[]>([]);
	const [showRateLimitDialog, setShowRateLimitDialog] = useState(false);
	const [answer, setAnswer] = useState("");
	const [rateLimitInfo, setRateLimitInfo] = useState<{
		resetTime?: string;
		remaining?: number;
	}>({});
	const [thinking, setThinking] = useState("");
	const [showErrorDialog, setShowErrorDialog] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [projectChatsLoaded, setProjectChatsLoaded] = useState(false);

	const { All, New, ...otherCats } = useMemo(() => categories, [categories]);

	// API validation on page load
	const { isValidating, showApiKeyError } = useApiValidation();

	// Load projects on page mount (only if API is valid)
	useEffect(() => {
		if (!isValidating && !showApiKeyError) {
			loadProjectsWithCache();
		}
	}, [isValidating, showApiKeyError]);

	const loadProjectsWithCache = async () => {
		// First, try to load from sessionStorage for immediate display
		try {
			const cachedProjects = sessionStorage.getItem("projects");
			if (cachedProjects) {
				const parsedProjects = JSON.parse(cachedProjects);
				setProjects(parsedProjects);
				setProjectsLoaded(true);
			}
		} catch (err) {
			// Silently handle cache loading errors
		}

		// Then fetch fresh data in the background
		loadProjects();
	};

	const loadProjects = async () => {
		try {
			const response = await fetch("/api/projects");
			if (response.ok) {
				const data = await response.json();
				const projectsData = data.data || data || [];
				setProjects(projectsData);
				setProjectsLoaded(true);

				// Store in sessionStorage for next time
				try {
					sessionStorage.setItem("projects", JSON.stringify(projectsData));
				} catch (err) {
					// Silently handle cache storage errors
				}
			} else if (response.status === 401) {
				const errorData = await response.json();
				if (errorData.error === "API_KEY_MISSING") {
					// API key error is now handled by useApiValidation hook
					return;
				}
			}
		} catch (err) {
			// Silently handle project loading errors
		} finally {
			// Mark as loaded even if there was an error
			setProjectsLoaded(true);
		}
	};

	const loadProjectChatsWithCache = async (projectId: string) => {
		// First, try to load from sessionStorage for immediate display
		try {
			const cachedChats = sessionStorage.getItem(
				`project-chats-${projectId}`
			);
			if (cachedChats) {
				const parsedChats = JSON.parse(cachedChats);
				setProjectChats(parsedChats);
				setProjectChatsLoaded(true);
			}
		} catch (err) {
			// Silently handle cache loading errors
		}

		// Then fetch fresh data in the background
		try {
			const response = await fetch(`/api/projects/${projectId}`);
			if (response.ok) {
				const data = await response.json();
				const chatsData = data.chats || [];
				setProjectChats(chatsData);
				setProjectChatsLoaded(true);

				// Store in sessionStorage for next time
				try {
					sessionStorage.setItem(
						`project-chats-${projectId}`,
						JSON.stringify(chatsData)
					);
				} catch (err) {
					// Silently handle cache storage errors
				}
			}
		} catch (err) {
			// Silently handle project chats loading errors
		}
	};

	const handleProjectChange = async (newProjectId: string) => {
		if (newProjectId === "new") {
			// Stay on homepage for new project
			setSelectedProjectId("new");
			setSelectedChatId("new");
			setProjectChats([]);
		} else {
			// Redirect to the selected project page
			router.push(`/projects/${newProjectId}`);
		}
	};

	const handleChatChange = (newChatId: string) => {
		setSelectedChatId(newChatId);
	};

	const handleSubmit = async (
		e: any,
		prompt: string,
		settings: {
			modelId: string;
			imageGenerations: boolean;
			thinking: boolean;
		},
		attachments?: { url: string; name?: string; type?: string }[]
	) => {
		e.preventDefault();
		setThinking("");
		setAnswer("");
		setIsLoading(true);
		setError(null);

		const response = await fetch("/api/generate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				message: prompt,
				modelId: settings.modelId,
				imageGenerations: settings.imageGenerations,
				thinking: settings.thinking,
				...(attachments && attachments.length > 0 && { attachments }),
			}),
		});

		const reader = response.body.getReader();
		const decoder = new TextDecoder();

		let buffer = "";

		while (true) {
			const { done, value } = await reader.read();
			if (done) break;

			buffer += decoder.decode(value, { stream: true });

			// Your backend can stream JSONL or SSE events like:
			// event:thinking\n data: "..."\n\n
			// event:message\n data: "..."\n\n
			// Here we parse simple "lines"
			const lines = buffer.split("\n\n");
			buffer = lines.pop() || "";

			for (const line of lines) {
				if (line.startsWith("event:thinking")) {
					const payload = line
						.replace("event:thinking\n", "")
						.replace("data:", "")
						.trim();
					setThinking((prev) => prev + payload);
				} else if (line.startsWith("event:message")) {
					const payload = line
						.replace("event:message\n", "")
						.replace("data:", "")
						.trim();
					setAnswer((prev) => prev + payload);
				}
			}
		}
	};

	const [selectedComponents, setSelectedComponents] = useState([]);
	const [previewComponent, setPreviewComponent] = useState();

	// Show API key error page if needed
	if (showApiKeyError) {
		return <ApiKeyError />;
	}

	const PreviewComponentImport = dynamic(
		() =>
			import(
				"@/components/usages/" +
					previewComponent?.name.replace(".json", "").replaceAll("-", "") +
					"usage.tsx"
			),
		{
			loading: ComponentLoading,
			ssr:
				previewComponent?.name.toLowerCase().includes("select-modal") ||
				previewComponent?.name.toLowerCase().includes("dither") ||
				previewComponent?.name.toLowerCase().includes("text-rotate") ||
				previewComponent?.name.toLowerCase().includes("flipped-menu")
					? false
					: true,
		}
	);

	useEffect(() => {
		const es = new EventSource("/api/generate");

		es.addEventListener("thinking", (e) => {
			const data = JSON.parse(e.data);
			setThinking((prev) => prev + data.content);
		});

		es.addEventListener("message", (e) => {
			const data = JSON.parse(e.data);
			setAnswer((prev) => prev + data.content);
		});

		es.addEventListener("end", () => {
			es.close();
		});
	}, []);

	return (
		<SidebarProvider open={!!previewComponent?.name}>
			<div className="relative min-h-dvh bg-background">
				{/* Homepage Welcome Message */}
				<div className="flex items-center justify-center">
					<div className="text-center px-4 sm:px-6">
						<h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 text-pretty">
							Drive Brand Studio GEN
						</h1>
						<p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
							This is a collection of {files.length} animated components.
							<br />
							And 500+ generic components
						</p>
					</div>
				</div>
				<div className="grid grid-cols-2 gap-4">
					<div className="p-3 border rounded-lg bg-gray-50">
						<h2 className="font-bold mb-2">🤔 Thinking Process</h2>
						<pre className="whitespace-pre-wrap">{thinking || "…"}</pre>
					</div>
					<div className="p-3 border rounded-lg bg-white">
						<h2 className="font-bold mb-2">💡 Final Answer</h2>
						<pre className="whitespace-pre-wrap">{answer || "…"}</pre>
					</div>
				</div>

				<section className="flex pb-[200px]">
					<div>
						<Accordion collapsible type="multiple">
							{Object.entries({ All }).map(
								([category, { description, components, id }], i) => {
									return (
										<div className="" key={`${description} + ${i}`}>
											<AccordionItem value={category}>
												<AccordionTrigger>
													{category}
												</AccordionTrigger>
												<AccordionContent>
													<ul
														key={category}
														className="grid grid-cols-6 gap-3"
													>
														{components?.map((item) => {
															const itemName = files.find(
																(file) => {
																	return (
																		file.name.replace(
																			".json",
																			""
																		) === item
																	);
																}
															);

															if (!itemName?.name) {
																return (
																	<li key={"no code all"}>
																		NO CODE AVAILABLE
																	</li>
																);
															}

															return (
																<li
																	key={itemName.name}
																	className={`rounded-2xl h-full content-center relative px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md ${
																		category === "All"
																			? "text-red-400"
																			: "text-white"
																	}`}
																>
																	<ShareButton
																		links={[
																			{
																				onClick: () => {
																					selectedComponents.includes(
																						itemName.name
																					)
																						? setSelectedComponents(
																								(
																									prev
																								) =>
																									prev.filter(
																										(
																											prevItem
																										) =>
																											itemName.name !==
																											prevItem
																									)
																							)
																						: setSelectedComponents(
																								[
																									itemName.name,
																									...selectedComponents,
																								]
																							);
																				},
																				icon: null,
																				label: "Add to AI",
																			},
																			{
																				onClick: () =>
																					setPreviewComponent(
																						itemName
																					),
																				icon: null,
																				label: "Preview",
																			},
																		]}
																	>
																		{itemName?.name.replace(
																			".json",
																			""
																		)}
																	</ShareButton>
																</li>
															);
														})}
													</ul>
												</AccordionContent>
											</AccordionItem>
										</div>
									);
								}
							)}
							{Object.entries(otherCats).map(
								([category, { description, components, id }], i) => {
									const categoryTotal = components;

									return (
										<div className="" key={`${description} + ${i}`}>
											<AccordionItem value={category}>
												<AccordionTrigger>
													{category}
												</AccordionTrigger>
												<AccordionContent>
													<ul
														key={category}
														className="grid grid-cols-6 gap-3"
													>
														{categoryTotal.map((item) => {
															const itemName = files.find(
																(file) => {
																	return (
																		file.name.replace(
																			".json",
																			""
																		) === item
																	);
																}
															);

															if (!itemName?.name) {
																return (
																	<li key={"no code" + i}>
																		NO CODE AVAILABLE
																	</li>
																);
															}

															return (
																<li
																	key={itemName.name}
																	className={`rounded-2xl h-full content-center relative px-6 py-4 bg-zinc-800 hover:bg-zinc-700 transition-colors text-center font-medium shadow-md ${
																		category === "All"
																			? "text-red-400"
																			: "text-white"
																	}`}
																>
																	<ShareButton
																		links={[
																			{
																				onClick: () => {
																					selectedComponents.includes(
																						itemName.name
																					)
																						? setSelectedComponents(
																								(
																									prev
																								) =>
																									prev.filter(
																										(
																											prevItem
																										) =>
																											itemName.name !==
																											prevItem
																									)
																							)
																						: setSelectedComponents(
																								[
																									itemName.name,
																									...selectedComponents,
																								]
																							);
																				},
																				icon: null,
																				label: "Add to AI",
																			},
																			{
																				onClick: () =>
																					setPreviewComponent(
																						itemName
																					),
																				icon: null,
																				label: "Preview",
																			},
																		]}
																	>
																		{itemName?.name.replace(
																			".json",
																			""
																		)}
																	</ShareButton>
																</li>
															);
														})}
													</ul>
												</AccordionContent>
											</AccordionItem>
										</div>
									);
								}
							)}
						</Accordion>
					</div>

					<Sidebar side="right" className="bg-white">
						<SidebarHeader>
							<span className="flex bg-white">
								<button
									className="mr-3"
									onClick={() => setPreviewComponent()}
								>
									x
								</button>
								Component Preview
							</span>
						</SidebarHeader>
						<SidebarContent>
							<SidebarGroup>
								{!!previewComponent?.name && (
									<Suspense fallback={<span>Loading</span>}>
										<Component
											collapsed={[]}
											setCollapsed={() => null}
											gridView={"1"}
											setComponentCount={() => null}
											selectedFilters={[]}
											title={previewComponent?.name.replace(
												".json",
												""
											)}
											content={previewComponent?.content}
										>
											{!!PreviewComponentImport ? (
												<PreviewComponentImport />
											) : (
												<div>
													failed to load{" "}
													{previewComponent.name.replace(
														".json",
														""
													)}
												</div>
											)}
										</Component>
									</Suspense>
								)}
							</SidebarGroup>
						</SidebarContent>
					</Sidebar>
				</section>

				<PromptComponent
					onSubmit={handleSubmit}
					isLoading={isLoading}
					placeholder="Describe your app..."
					showDropdowns={projectsLoaded}
					projects={projects}
					projectChats={projectChats}
					currentProjectId={selectedProjectId}
					currentChatId={selectedChatId}
					onProjectChange={handleProjectChange}
					onChatChange={handleChatChange}
					selectedComponents={selectedComponents}
					setSelectedComponents={setSelectedComponents}
				/>

				<RateLimitDialog
					isOpen={showRateLimitDialog}
					onClose={() => setShowRateLimitDialog(false)}
					resetTime={rateLimitInfo.resetTime}
					remaining={rateLimitInfo.remaining}
				/>

				<ErrorDialog
					isOpen={showErrorDialog}
					onClose={() => setShowErrorDialog(false)}
					message={errorMessage}
				/>
			</div>
		</SidebarProvider>
	);
}
