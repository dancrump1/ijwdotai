"use client";

import React, { useEffect, useState } from "react";

import Image from "next/image";

import MarqueeAlongSvgPathDemo from "@/components/usages/marqueealongsvgusage";
import AccordionSlices from "@/registry/open-source/accordion-slices";
import FAQPage from "@/registry/open-source/faq-section";
import Gravity, { MatterBody } from "@/registry/open-source/gravity";
import InfiniteScrollingLogosAnimation from "@/registry/open-source/infinite-scrolling-logos-animation";
import OppositeScroll from "@/registry/open-source/opposite-scroll-links";
import Preloader from "@/registry/open-source/preloader";
import {
	ScrollVelocityContainer,
	ScrollVelocityRow,
} from "@/registry/open-source/scroll-velocity";
import { AnimatePresence } from "motion/react";

const colors = ["bg-blue-500", "bg-green-500", "bg-pink-500", "bg-yellow-500"];
export const fake_workspotlight = [
	{
		id: "work1",
		title: "work 1",
		image: { url: "/itjustworks.jpg" },
		uri: "https://google.com",
	},
	{
		id: "work2",
		title: "work 2",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work3",
		title: "work 3",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work4",
		title: "work 4",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work5",
		title: "work 5",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work6",
		title: "work 6",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work7",
		title: "work 7",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work8",
		title: "work 8",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work9",
		title: "work 9",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work10",
		title: "work 10",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
];

function Home({ data }) {
	const [loader, setLoader] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoader(false);
		}, 2250);
	}, [loader]);

	return (
		<>
			<AnimatePresence mode="wait">
				{loader && <Preloader />}
			</AnimatePresence>

			{!loader && (
				<main className="">
					<section className="h-[90vh] w-full relative overflow-hidden">
						<Gravity gravity={{ x: 0, y: 1 }}>
							{[
								"Audience",
								"Ad Ninjas",
								"Pixel Punch",
								"Buzz Hoppers",
								"Quirk Works",
								"Brand Bandits",
								"Vibe Tribe",
								"Click Circus",
								"Idea Sparks",
								"Snappy Snails",
								"Funky Funnels",
								"Meme Machine",
								"Slogan Squad",
								"Trend Pirates",
								"Zap Labs",
								"Hype Hive",
								"Quirkit",
								"Buzzlet",
								"Snaptik",
								"Brandle",
								"Zestify",
								"Huzzle",
								"Sparklio",
								"Vibbly",
								"Funnelo",
								"Adwizzle",
								"Trendish",
								"Blinksy",
								"Slogify",
								"Zapster",
								"Pufflet",
							].map((item) => {
								const x = `${Math.random() * 80}%`;
								const y = `${Math.random() * 80}%`;
								const colorClass =
									colors[Math.floor(Math.random() * colors.length)];

								return (
									<MatterBody
										matterBodyOptions={{
											friction: 0.5,
											restitution: 0.2,
										}}
										x={x}
										y={y}
										key={item}
									>
										<div
											className={`text-xl sm:text-2xl md:text-3xl ${colorClass} text-white rounded-full hover:cursor-pointer px-8 py-4`}
										>
											{" "}
											{item}
										</div>
									</MatterBody>
								);
							})}
							<MatterBody
								matterBodyOptions={{
									friction: 0.5,
									restitution: 0.2,
								}}
								x="30%"
								y="10%"
							>
								<div className="text-xl sm:text-2xl md:text-3xl bg-blue-500 text-white rounded-full hover:cursor-pointer px-8 py-4">
									Audience
								</div>
							</MatterBody>
							<MatterBody
								matterBodyOptions={{
									friction: 0.5,
									restitution: 0.2,
								}}
								x="30%"
								y="10%"
							>
								<div className="text-xl sm:text-2xl md:text-3xl bg-blue-500 text-white rounded-full hover:cursor-pointer px-8 py-4">
									20+ years of experience
								</div>
							</MatterBody>
							<MatterBody
								matterBodyOptions={{
									friction: 0.5,
									restitution: 0.2,
								}}
								x="30%"
								y="30%"
							>
								<div className="text-xl sm:text-2xl md:text-3xl bg-pink-500 text-white rounded-full hover:cursor-grab px-8 py-4 ">
									Under-Promise <br />
									Over-Deliver
								</div>
							</MatterBody>
							<MatterBody
								matterBodyOptions={{
									friction: 0.5,
									restitution: 0.2,
								}}
								x="40%"
								y="20%"
								angle={10}
							>
								<div className="text-xl sm:text-2xl md:text-3xl bg-teal-400 text-white rounded-full hover:cursor-grab px-8 py-4 ">
									Outcome
								</div>
							</MatterBody>
							<MatterBody
								matterBodyOptions={{
									friction: 0.5,
									restitution: 0.2,
								}}
								x="75%"
								y="10%"
							>
								<div className="text-xl sm:text-2xl md:text-3xl bg-red-400 text-white rounded-full hover:cursor-grab px-8 py-4 ">
									Research
								</div>
							</MatterBody>
							<MatterBody
								matterBodyOptions={{
									friction: 0.5,
									restitution: 0.2,
								}}
								x="80%"
								y="20%"
							>
								<div className="text-xl sm:text-2xl md:text-3xl bg-orange-400 text-white rounded-full hover:cursor-grab px-8 py-4 ">
									Activate
								</div>
							</MatterBody>
							<MatterBody
								matterBodyOptions={{
									friction: 0.5,
									restitution: 0.2,
								}}
								x="50%"
								y="10%"
							>
								<div className="text-xl sm:text-2xl md:text-3xl bg-yellow-400 text-white rounded-full hover:cursor-grab px-8 py-4 ">
									Your Brand
								</div>
							</MatterBody>
						</Gravity>
						<h1 className="absolute inset-0 z-0 content-center text-center pointer-events-none">
							DRIVE BRAND STUDIO
						</h1>
					</section>

					<InfiniteScrollingLogosAnimation />

					<section className="flex my-32">
						<div>
							<h2>The DBS effect</h2>
							<span>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit,
								sed do eiusmod tempor incididunt ut labore et dolore
								magna aliqua.
							</span>
							<button>Learn More</button>
						</div>

						<div></div>
					</section>

					<section className="relative h-[50vh] w-full">
						<MarqueeAlongSvgPathDemo />
					</section>

					<section className="my-32">
						<FAQPage
							faqs={{
								Capabilities: [
									{
										question: "Strategy",
										answer:
											"We offer a wide range of pre-built UI components built with Tailwind CSS and Framer Motion, including buttons, cards, forms, navigation menus, and more.",
									},
									{
										question: "Creative",
										answer:
											"Simply copy and paste the code for the components you need into your project, then customize the styles and functionality to match your design.",
									},
									{
										question: "Website",
										answer:
											"Yes, our components are designed to be fully responsive and optimized for both desktop and mobile devices.",
									},
									{
										question: "Consultation",
										answer:
											"Absolutely! The components are highly customizable, allowing you to easily change colors, fonts, and other styles to match your brand identity.",
									},
								],
								["Case Studies"]: [
									{
										question: "Cannon Mt",
										answer:
											"Our components are built with modern technologies like Tailwind CSS and Framer Motion, offering advanced features like animations, hover effects, and smooth scrolling.",
									},
									{
										question: "Cranmore",
										answer:
											"Yes, we offer comprehensive documentation and support to help you get started and troubleshoot any issues you may encounter.",
									},
									{
										question: "MWV Chamber of Commerce",
										answer:
											"We regularly add new components and update existing ones to ensure you always have access to the latest design trends and best practices.",
									},
									{
										question: "Hannaford",
										answer:
											"Yes, our components are licensed for commercial use, allowing you to incorporate them into your client projects without any additional fees.",
									},
								],
							}}
						/>
					</section>

					<section className="bg-secondary my-32 py-32">
						<ScrollVelocityContainer className="text-4xl md:text-7xl md:leading-[5rem] font-bold tracking-[-0.02em]">
							<ScrollVelocityRow
								baseVelocity={5}
								direction={1}
								className="z-10 relative"
							>
								Let us be you listening ear.{" "}
							</ScrollVelocityRow>
							<Image
								src={"/itjustworks.jpg"}
								alt={""}
								height={60}
								width={60}
								className="absolute left-[calc(50vw-155px)] top-0 z-20 h-full w-fit"
							/>
							<ScrollVelocityRow
								baseVelocity={5}
								direction={-1}
								className="z-30 relative"
							>
								Let us be your listening ear.{" "}
							</ScrollVelocityRow>
						</ScrollVelocityContainer>{" "}
					</section>

					<section className="my-32">
						<h2>Some of our work</h2>
						<AccordionSlices />
						<OppositeScroll works={fake_workspotlight} />
					</section>
				</main>
			)}
		</>
	);
}

export default Home;
