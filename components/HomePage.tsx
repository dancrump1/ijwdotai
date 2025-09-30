"use client";

import { SyntheticEvent, useEffect, useState } from "react";

import Link from "next/link";

import { credits } from "@/app/(library)/credits/page";
import getData from "@/lib/fetchJavaData";
import { SpringModal } from "@/registry/open-source/spring-modal";

import { simpleCategories } from "@/config/components";

import { MultiSelect } from "./MultiSelect";

export default function HomePage({
	files,
	categories,
	api_comps,
}: {
	files: { name: string }[];
	categories: any;
	api_comps: any;
}) {
	const [hovered, setHovered] = useState<string | null>(null);
	const [isOpen, setIsOpen] = useState(false);
	const [isNewOpen, setIsNewOpen] = useState(false);
	const [isNewComponentOpen, setIsNewComponentOpen] = useState(false);
	const [isDeleteComponentOpen, setIsDeleteComponentOpen] = useState(false);
	const [categoryId, setCategoryId] = useState(1);
	const [componentName, setComponentName] = useState(null);
	const [description, setDescription] = useState("test ste 123");
	const [title, setTitle] = useState("test title");
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);
	const [newData, setNewData] = useState(null);
	const [items, setItems] = useState([""]);
	const [test, setSubcategories] = useState([""]);
	const [largestId, setLargestId] = useState(1);
	const [username, setUsername] = useState(null);
	const [password, setPassword] = useState(null);
	const [matchingComponents, setMatchingComponents] = useState([]);

	const handleUpdate = async () => {
		try {
			const res = await fetch(
				process.env.NEXT_PUBLIC_API_URL +
					`/category/${categoryId}/description`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Basic " + btoa(`${username}:${password}`),
					},
					body: JSON.stringify({
						description,
						components: matchingComponents,
					}),
				}
			);

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			const data = await res.json();
			setResponse(data);
			setError(null);
			setIsOpen(false);
		} catch (err) {
			console.error(err);
			setError(err.message);
		}

		setNewData(await getData());
	};

	const handleSave = async (e: SyntheticEvent) => {
		e.preventDefault();

		try {
			const res = await fetch(
				process.env.NEXT_PUBLIC_API_URL + `/category/new/category`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Basic " + btoa(`${username}:${password}`),
					},
					body: JSON.stringify({ description, title }),
				}
			);

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			setResponse(null);
			setError(null);
			setIsOpen(false);
		} catch (err) {
			setError(err.message);
		}

		setNewData(await getData());
	};

	const handleSaveNewComponent = async (e: SyntheticEvent) => {
		e.preventDefault();
		try {
			const res = await fetch(
				process.env.NEXT_PUBLIC_API_URL + `/components/new/component`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Basic " + btoa(`${username}:${password}`),
					},
					body: JSON.stringify({ description, title }),
				}
			);

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			setResponse(null);
			setError(null);
			setIsOpen(false);
		} catch (err) {
			setError(err.message);
		}

		setNewData(await getData());
	};

	const handleDelete = async () => {
		try {
			const res = await fetch(
				process.env.NEXT_PUBLIC_API_URL + `/category/remove/${categoryId}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Basic " + btoa(`${username}:${password}`),
					},
					body: JSON.stringify({ description, title }),
				}
			);

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			setResponse(null);
			setError(null);
			setIsOpen(false);
		} catch (err) {
			setError(err.message);
		}

		setNewData(await getData());
	};

	const handleDeleteComponent = async (e: any) => {
		e.preventDefault();
		try {
			const res = await fetch(
				process.env.NEXT_PUBLIC_API_URL +
					`/components/remove/${componentName}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
						Authorization: "Basic " + btoa(`${username}:${password}`),
					},
					body: JSON.stringify({ description, title }),
				}
			);

			if (!res.ok) {
				throw new Error(`HTTP error! status: ${res.status}`);
			}

			setResponse(null);
			setError(null);
			setIsOpen(false);
		} catch (err) {
			setError(err.message);
		}

		setNewData(await getData());
	};

	useEffect(() => {
		setLargestId(
			Math.max(Object.entries(categories)?.map(([category, { id }]) => id))
		);
	}, [categories]);

	useEffect(() => {
		setCategoryId(largestId + 1);
	}, [largestId]);

	const closeModal = (shouldClose: boolean) => {
		setIsOpen(shouldClose);
		setUsername(null);
		setPassword(null);
		setMatchingComponents([]);
		setError(null);
		setResponse(null);
	};

	const closeNeweModal = (shouldClose: boolean) => {
		setIsNewOpen(shouldClose);
		setUsername(null);
		setPassword(null);
		setMatchingComponents([]);
		setError(null);
		setResponse(null);
	};

	const closeNewComponentModal = (shouldClose: boolean) => {
		setIsNewComponentOpen(shouldClose);
		setUsername(null);
		setPassword(null);
		setError(null);
		setResponse(null);
	};

	const closeDeleteComponentModal = (shouldClose: boolean) => {
		setIsDeleteComponentOpen(shouldClose);
		setUsername(null);
		setPassword(null);
		setError(null);
		setResponse(null);
	};

	return (
		<main className="min-h-screen bg-zinc-950 text-white p-8">
			<section>
				<h2>Heavy animations</h2>
				<div className="grid grid-cols-7 h-full min-h-screen">
					<div className="grid grid-cols-2 col-span-7 md:col-span-3 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-4xl mx-auto h-fit">
						{Object.entries(newData ?? categories).map(
							([category, { description, components, id }], i) => {
								// Build query string from subcategories
								const queryString =
									category === "All"
										? ""
										: "?" +
											components
												?.map(
													(sub) =>
														`subcategory=${encodeURIComponent(sub)}`
												)
												.join("&");

								// Build href
								const href =
									category === "All"
										? "/all"
										: `/type/${encodeURIComponent(category.toLowerCase().replace(/\s&\s|\s/g, "-"))}${queryString}`;

								const categoryTotal = components;

								return (
									<div className="flex flex-col group relative">
										<Link
											key={category}
											onMouseEnter={() => {
												setHovered(category);
												setItems(
													categoryTotal.map((item) => item.name)
												);
												setSubcategories(components);
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

											{categoryTotal.length}
											<br />
											{description}
										</Link>
										<button
											onClick={() => {
												setIsOpen(true);
												setCategoryId(id);
												setDescription(description);
												setMatchingComponents(components);
											}}
											className="hidden group-hover:block absolute bottom-0 z-10 bg-gradient-to-r from-violet-600 to-indigo-600 text-foreground font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity h-fit"
										>
											Edit {category}
										</button>
									</div>
								);
							}
						)}
						<SpringModal isOpen={isOpen} setIsOpen={closeModal}>
							<form
								onSubmit={(e) => {
									e.preventDefault();
									const action = e.nativeEvent.submitter.value; // which button was clicked

									if (action === "Submit") {
										handleUpdate();
									} else if (action === "Delete") {
										handleDelete();
									}
								}}
								style={{
									padding: "1rem",
									maxWidth: "500px",
								}}
							>
								<h2>Update Category</h2>
								<input
									type="text"
									placeholder="Username"
									value={username}
									required
									onChange={(e) => setUsername(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
								<input
									type="password"
									placeholder="Password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
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
								<input
									type="number"
									placeholder="category to change"
									value={categoryId}
									onChange={(e) => setCategoryId(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
								<MultiSelect
									options={api_comps
										?.sort((a, b) =>
											a?.title?.localeCompare(b?.title)
										)
										.map((item) => ({
											value: item.title,
											label: item.title,
										}))}
									onValueChange={setMatchingComponents}
									defaultValue={matchingComponents}
									popoverClassname="bg-black z-[55]"
									className="z-[55]"
								/>
								<input
									type="submit"
									value="Submit"
									style={{
										padding: "0.5rem 1rem",
										cursor: "pointer",
									}}
								/>

								<input
									type="submit"
									value="Delete"
									name="delete"
									style={{
										padding: "0.5rem 1rem",
										cursor: "pointer",
									}}
								/>

								{response && (
									<div
										style={{
											marginTop: "1rem",
											color: "green",
										}}
									>
										<strong>Updated category:</strong>{" "}
										{JSON.stringify(response)}
									</div>
								)}

								{error && (
									<div
										style={{
											marginTop: "1rem",
											color: "red",
										}}
									>
										<strong>Error:</strong> {error}
									</div>
								)}
							</form>
						</SpringModal>
						<span
							className={`rounded-2xl h-fit relative px-6 py-4 bg-zinc-800 transition-colors text-center font-medium shadow-md ${"text-white"}`}
						>
							⭐: Component added within a week
							<br />
							All: May cause lag
						</span>

						<SpringModal isOpen={isNewOpen} setIsOpen={closeNeweModal}>
							<form
								onSubmit={handleSave}
								style={{
									padding: "1rem",
									maxWidth: "500px",
								}}
							>
								<h2>new Category</h2>
								<input
									type="text"
									placeholder="Username"
									value={username}
									required
									onChange={(e) => setUsername(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
								<input
									type="password"
									placeholder="Password"
									value={password}
									required
									onChange={(e) => setPassword(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
								<input
									type="text"
									placeholder="New Title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
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
								<input
									type="number"
									placeholder="category to change"
									value={categoryId}
									onChange={(e) => setCategoryId(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
								<input
									type="submit"
									style={{
										padding: "0.5rem 1rem",
										cursor: "pointer",
									}}
								/>

								{response && (
									<div
										style={{
											marginTop: "1rem",
											color: "green",
										}}
									>
										<strong>added category:</strong>{" "}
										{JSON.stringify(response)}
									</div>
								)}

								{error && (
									<div
										style={{
											marginTop: "1rem",
											color: "red",
										}}
									>
										<strong>Error:</strong> {error}
									</div>
								)}
							</form>
						</SpringModal>
						<div className="flex flex-col">
							<span
								className={`rounded-2xl h-fit relative px-6 py-4 bg-zinc-800 transition-colors text-center font-medium shadow-md ${"text-white"}`}
							>
								New Category
							</span>
							<button
								onClick={() => {
									setIsNewOpen(true);
									setCategoryId(largestId + 1);
									setDescription(description);
									setMatchingComponents([]);
								}}
								className="bg-gradient-to-r from-violet-600 to-indigo-600 text-foreground font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity h-fit"
							>
								Create Category
							</button>
						</div>
						<SpringModal
							isOpen={isNewComponentOpen}
							setIsOpen={closeNewComponentModal}
						>
							<form
								onSubmit={handleSaveNewComponent}
								style={{
									padding: "1rem",
									maxWidth: "500px",
								}}
							>
								<h2>new Category</h2>
								<input
									type="text"
									placeholder="Username"
									value={username}
									required
									onChange={(e) => setUsername(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
								<input
									type="password"
									placeholder="Password"
									value={password}
									required
									onChange={(e) => setPassword(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
								<input
									type="text"
									placeholder="New Title"
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									style={{
										width: "100%",
										padding: "0.5rem",
										marginBottom: "0.5rem",
									}}
								/>
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
								<input
									type="submit"
									style={{
										padding: "0.5rem 1rem",
										cursor: "pointer",
									}}
								/>

								{response && (
									<div
										style={{
											marginTop: "1rem",
											color: "green",
										}}
									>
										<strong>added category:</strong>{" "}
										{JSON.stringify(response)}
									</div>
								)}

								{error && (
									<div
										style={{
											marginTop: "1rem",
											color: "red",
										}}
									>
										<strong>Error:</strong> {error}
									</div>
								)}
							</form>
						</SpringModal>
						<div className="flex flex-col">
							<span
								className={`rounded-2xl h-fit relative px-6 py-4 bg-zinc-800 transition-colors text-center font-medium shadow-md ${"text-white"}`}
							>
								New Component
							</span>
							<div className={"flex flex-col w-full"}>
								<button
									onClick={() => {
										setIsNewComponentOpen(true);
										setDescription(description);
										setTitle(title);
									}}
									className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-foreground font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity h-fit"
								>
									Create Component
								</button>
								<button
									onClick={() => {
										setIsDeleteComponentOpen(true);
									}}
									className="flex-1 bg-gradient-to-r from-violet-600 to-indigo-600 text-foreground font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity h-fit"
								>
									Delete Component
								</button>
								<SpringModal
									isOpen={isDeleteComponentOpen}
									setIsOpen={closeDeleteComponentModal}
								>
									<form
										onSubmit={handleDeleteComponent}
										style={{
											padding: "1rem",
											maxWidth: "500px",
										}}
									>
										<h2>Delete Component</h2>
										<input
											type="text"
											placeholder="Username"
											value={username}
											required
											onChange={(e) => setUsername(e.target.value)}
											style={{
												width: "100%",
												padding: "0.5rem",
												marginBottom: "0.5rem",
											}}
										/>
										<input
											type="password"
											placeholder="Password"
											value={password}
											required
											onChange={(e) => setPassword(e.target.value)}
											style={{
												width: "100%",
												padding: "0.5rem",
												marginBottom: "0.5rem",
											}}
										/>

										<MultiSelect
											options={api_comps
												?.sort((a, b) =>
													a?.title?.localeCompare(b?.title)
												)
												.map((item) => ({
													value: item.title,
													label: item.title,
												}))}
											maxCount={1}
											onValueChange={setComponentName}
											defaultValue={matchingComponents}
											popoverClassname="bg-black z-[55]"
											className="z-[55]"
										/>

										<input
											type="submit"
											style={{
												padding: "0.5rem 1rem",
												cursor: "pointer",
											}}
										/>

										{response && (
											<div
												style={{
													marginTop: "1rem",
													color: "green",
												}}
											>
												<strong>added category:</strong>{" "}
												{JSON.stringify(response)}
											</div>
										)}

										{error && (
											<div
												style={{
													marginTop: "1rem",
													color: "red",
												}}
											>
												<strong>Error:</strong> {error}
											</div>
										)}
									</form>
								</SpringModal>
							</div>
						</div>
					</div>
					<section className="flex ml-6">
						<div>
							<span>
								<strong>Existing components</strong>
							</span>
							<ul>
								{files.map((item) => (
									<li className="whitespace-nowrap">
										{item.name.replace(".json", "")}
									</li>
								))}
							</ul>
						</div>
						<div>
							<span>
								<strong className="whitespace-nowrap">
									Components in db
								</strong>
							</span>
							<ul>
								{api_comps.map((item) => (
									<li className="whitespace-nowrap">{item.title}</li>
								))}
							</ul>
						</div>
					</section>
					{/* <div className="hidden md:block col-span-2">
						<span className="text-lg border-b-2 border-white">
							Matching Items:
						</span>
						<ul className="flex flex-col flex-wrap h-full max-h-[50vh] overflow-hidden">
							{items.map((item) => (
								<li>{item}</li>
							))}
						</ul>
					</div>
					<div className="hidden md:block col-span-1">
						<span className="text-lg border-b-2 border-white">
							Filter Match:
						</span>
						<ul className="flex flex-col flex-wrap h-full overflow-hidden">
							{test.map((item) => (
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
					</div> */}
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
