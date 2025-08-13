"use client";

import React, { useEffect, useRef, useState } from "react";

import Link from "next/link";

import CircularText from "@/registry/open-source/circle-text";
import Floating, {
	FloatingElement,
} from "@/registry/open-source/parallax-floating";
import SpringModal from "@/registry/open-source/spring-modal";
import TextRotate from "@/registry/open-source/text-rotate";
import { cn } from "@/registry/utilities/cn";
import { LayoutGroup, motion } from "motion/react";

const useAnimateCarousel = (activeItem: number) => {
	const wrapperRef = useRef<HTMLUListElement | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!wrapperRef.current) {
			return;
		}
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		wrapperRef.current.style.setProperty(
			"--transition",
			"600ms cubic-bezier(0.22, 0.61, 0.36, 1)"
		);

		timeoutRef.current = setTimeout(() => {
			wrapperRef.current?.style.removeProperty("--transition");
		}, 900);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [activeItem]);

	return wrapperRef;
};

const exampleImages = [
	{
		url: "/itjustworks.jpg",
		author: "Branislav Rodman",
		title: "A Black and White Photo of a Woman Brushing Her Teeth",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
		title: "Neon Palm",
		author: "Tim Mossholder",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
		author: "ANDRII SOLOK",
		title: "A blurry photo of a crowd of people",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
		author: "Wesley Tingey",
		title: "Rippling Crystal Blue Water",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
		author: "Serhii Tyaglovsky",
		title: "Mann im schwarzen Hemd unter blauem Himmel",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
		author: "Vladimir Yelizarov",
		title: "A women with a flower crown on her head",
	},
	{
		url: "/itjustworks.jpg",
		title: "A blurry photo of white flowers in a field",
		author: "Eugene Golovesov",
		link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
	},
	{
		url: "/itjustworks.jpg",
		author: "Mathilde Langevin",
		link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
		title: "A table topped with two wine glasses and plates",
	},
];

const images = [
	{
		firstName: "dan",
		lastName: "crump",
		jobTitle: "webdeveloper",
		img: "itjustworks.jpg",
		email: "dan@dan.dan",
		hoverImg: "itjustworks.jpg",
		description: "he does things and stuff",
	},
	{
		firstName: "cahtah",
		lastName: "davidson",
		jobTitle: "webdeveloper",
		img: "itjustworks.jpg",
		email: "dan@dan.dan",
		hoverImg: "itjustworks.jpg",
		description: "he does things and stuff",
	},
	{
		firstName: "nancy",
		lastName: "clark",
		jobTitle: "webdeveloper",
		img: "itjustworks.jpg",
		hoverImg: "itjustworks.jpg",
		email: "dan@dan.dan",
		description: "he does things and stuff",
	},
	{
		firstName: "laura",
		lastName: "bennett",
		jobTitle: "webdeveloper",
		img: "itjustworks.jpg",
		hoverImg: "itjustworks.jpg",
		email: "dan@dan.dan",
		description: "he does things and stuff",
	},
];
function About() {
	const [activeItem, setActiveItem] = useState(5);
	const wrapperRef = useAnimateCarousel(activeItem);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<main className="dark:text-white dark:bg-zinc-800">
			<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
				<section className="w-full h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center relative">
					<Floating sensitivity={-0.5} className="h-full">
						<FloatingElement
							depth={0.5}
							className="top-[15%] left-[2%] md:top-[25%] md:left-[5%]"
						>
							<motion.img
								src={exampleImages[0].url}
								alt={exampleImages[0].title}
								className="w-16 h-12 sm:w-24 sm:h-16 md:w-28 md:h-20 lg:w-32 lg:h-24 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-[3deg] shadow-2xl rounded-xl"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.5 }}
							/>
						</FloatingElement>

						<FloatingElement
							depth={1}
							className="top-[0%] left-[8%] md:top-[6%] md:left-[11%]"
						>
							<motion.img
								src={exampleImages[1].url}
								alt={exampleImages[1].title}
								className="w-40 h-28 sm:w-48 sm:h-36 md:w-56 md:h-44 lg:w-60 lg:h-48 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform -rotate-12 shadow-2xl rounded-xl"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.7 }}
							/>
						</FloatingElement>

						<FloatingElement
							depth={4}
							className="top-[90%] left-[6%] md:top-[80%] md:left-[8%]"
						>
							<motion.img
								src={exampleImages[2].url}
								alt={exampleImages[2].title}
								className="w-40 h-40 sm:w-48 sm:h-48 md:w-60 md:h-60 lg:w-64 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rounded-xl"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 0.9 }}
							/>
						</FloatingElement>

						<FloatingElement
							depth={2}
							className="top-[0%] left-[87%] md:top-[2%] md:left-[83%]"
						>
							<motion.img
								src={exampleImages[3].url}
								alt={exampleImages[3].title}
								className="w-40 h-36 sm:w-48 sm:h-44 md:w-60 md:h-52 lg:w-64 lg:h-56 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[6deg] rounded-xl"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1.1 }}
							/>
						</FloatingElement>

						<FloatingElement
							depth={1}
							className="top-[78%] left-[83%] md:top-[68%] md:left-[83%]"
						>
							<motion.img
								src={exampleImages[4].url}
								alt={exampleImages[4].title}
								className="w-44 h-44 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-cover hover:scale-105 duration-200 cursor-pointer transition-transform shadow-2xl rotate-[19deg] rounded-xl"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								transition={{ delay: 1.3 }}
							/>
						</FloatingElement>
					</Floating>

					<div className="flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] z-50 pointer-events-auto">
						<motion.h1
							className="text-3xl text-white mix-blend-soft-light dark:text-black sm:text-5xl md:text-7xl lg:text-8xl text-center w-full justify-center items-center flex-col flex whitespace-pre leading-tight tracking-tight space-y-1 md:space-y-4"
							animate={{ opacity: 1, y: 0 }}
							initial={{ opacity: 0, y: 20 }}
							transition={{
								duration: 0.2,
								ease: "easeOut",
								delay: 0.3,
							}}
						>
							<span>Meet our team of </span>
							<LayoutGroup>
								<motion.span layout className="flex whitespace-pre">
									<motion.span
										layout
										className="flex whitespace-pre"
										transition={{
											type: "spring",
											damping: 30,
											stiffness: 400,
										}}
									></motion.span>
									<TextRotate
										texts={[
											"super stars",
											"drivers",
											"perfect peeps",
											"quirkasauruses",
											"🪩 funky",
											"pop ✨",
											"rock 🤘",
										]}
										mainClassName="overflow-hidden pr-3 text-[#0015ff] py-0 pb-2 md:pb-4 rounded-xl"
										staggerDuration={0.03}
										staggerFrom="last"
										rotationInterval={3000}
										transition={{
											type: "spring",
											damping: 30,
											stiffness: 400,
										}}
									/>
								</motion.span>
							</LayoutGroup>
						</motion.h1>
						<motion.p
							className="text-sm text-white dark:text-black sm:text-lg md:text-xl lg:text-2xl text-center font-overusedGrotesk pt-4 sm:pt-8 md:pt-10 lg:pt-12"
							animate={{ opacity: 1, y: 0 }}
							initial={{ opacity: 0, y: 20 }}
							transition={{
								duration: 0.2,
								ease: "easeOut",
								delay: 0.5,
							}}
						>
							with a growing library of ready-to-use react components &
							microinteractions. free & open source.
						</motion.p>

						<div className="flex flex-row justify-center space-x-4 items-center mt-10 sm:mt-16 md:mt-20 lg:mt-20 text-xs">
							<motion.button
								className="sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-background bg-foreground px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
								animate={{ opacity: 1, y: 0 }}
								initial={{ opacity: 0, y: 20 }}
								transition={{
									duration: 0.2,
									ease: "easeOut",
									delay: 0.7,
									scale: { duration: 0.2 },
								}}
								whileHover={{
									scale: 1.05,
									transition: {
										type: "spring",
										damping: 30,
										stiffness: 400,
									},
								}}
							>
								<Link href="/docs/introduction">
									Check docs <span className="font-serif ml-1">→</span>
								</Link>
							</motion.button>
							<motion.button
								className="sm:text-base md:text-lg lg:text-xl font-semibold tracking-tight text-white bg-[#0015ff] px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 lg:px-8 lg:py-3 rounded-full z-20 shadow-2xl font-calendas"
								animate={{ opacity: 1, y: 0 }}
								initial={{ opacity: 0, y: 20 }}
								transition={{
									duration: 0.2,
									ease: "easeOut",
									delay: 0.7,
									scale: { duration: 0.2 },
								}}
								whileHover={{
									scale: 1.05,
									transition: {
										type: "spring",
										damping: 30,
										stiffness: 400,
									},
								}}
							>
								<Link href="https://github.com/danielpetho/fancy">
									★ on GitHub
								</Link>
							</motion.button>
						</div>
					</div>
				</section>{" "}
			</div>
			<section className="h-screen">
				<div className="flex overflow-x-auto h-full w-full items-center justify-center">
					<div className="w-[1200px] max-w-full">
						<ul
							ref={wrapperRef}
							className="group flex flex-col gap-3 md:h-[640px] md:flex-row md:gap-[1.5%] justify-center"
						>
							{/* Placeholder {} at front and end to take place of stripes off the edge */}
							{[{}, ...images, {}].map((person, index) => {
								return (
									<li
										onClick={() => setActiveItem(index)}
										onKeyUp={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												setActiveItem(index);
											}
										}}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												setActiveItem(index);
											}
										}}
										onKeyPress={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												setActiveItem(index);
											}
										}}
										aria-current={activeItem === index}
										className={cn(
											"relative cursor-pointer md:w-[8%] md:first:w-[1%] md:last:w-[1%] md:[&[aria-current='true']]:w-[48%]",
											"md:[transition:width_var(--transition,200ms_ease-in)]",
											"md:before-block before:absolute before:bottom-0 before:left-[-10px] before:right-[-10px] before:top-0 before:hidden before:bg-white",
											"md:[&:not(:hover),&:not(:first),&:not(:last)]:group-hover:w-[7%] md:hover:w-[12%]",
											"first:pointer-events-none last:pointer-events-none md:[&_img]:first:opacity-0 md:[&_img]:last:opacity-0"
										)}
										key={person.name}
									>
										<div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#c9c6c7]">
											<img
												className="absolute right-0 top-1/2 h-auto w-24 max-w-none -translate-y-1/2 object-cover grayscale md:left-1/2 md:h-[640px] md:w-[590px] md:-translate-x-1/2"
												src={
													activeItem === index
														? person.img
														: person.hoverImg
												}
												alt={person.name}
												width="590px"
												height="640px"
											/>
											<div
												className={cn(
													"before:bg-texture after:bg-texture inset-0 opacity-25 duration-300 before:absolute before:bottom-0 before:left-[-546px] before:right-0 before:top-[-148px]  before:z-10 after:bottom-[28px] after:left-0 after:right-[-434px] after:top-0 after:z-10 md:absolute md:transition-opacity",
													activeItem === index
														? "md:opacity-25"
														: "md:opacity-0"
												)}
											/>
											<div
												className={cn(
													"left-8 top-8 w-[590px] p-4 transition-[transform,opacity] md:absolute md:p-0",
													activeItem === index
														? "md:translate-x-0 md:opacity-100"
														: "md:translate-x-4 md:opacity-0"
												)}
											>
												<p className="text-sm uppercase text-primary md:text-lg">
													{person.title}
												</p>
												<p className="text-lg font-bold md:text-4xl">
													{person.name}
												</p>
											</div>
											{activeItem === index && (
												<div className="absolute bottom-0 right-0 left-0 block">
													<button
														onClick={() => setIsOpen(true)}
														className="bg-gradient-to-r from-violet-600 w-fit to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
													>
														Learn more about {person.name}
													</button>
													<SpringModal
														isOpen={isOpen}
														setIsOpen={setIsOpen}
														data={{ ...person }}
													/>
												</div>
											)}
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</section>

			<section className="flex overflow-hidden py-32">
				<CircularText text={"Quality"} onHover="goBonkers" />
				<CircularText text={"Comfort"} />
				<CircularText text={"Price"} onHover="slowDown" />
			</section>
		</main>
	);
}

export default About;
