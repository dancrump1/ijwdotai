"use client";

import React from "react";

import AccordionSlices from "@/registry/open-source/accordion-slices";
import FAQPage from "@/registry/open-source/faq-section";
import Gravity, { MatterBody } from "@/registry/open-source/gravity";
import InfiniteScrollingLogosAnimation from "@/registry/open-source/infinite-scrolling-logos-animation";
import {
	ScrollVelocityContainer,
	ScrollVelocityRow,
} from "@/registry/open-source/scroll-velocity";

const colors = ["bg-blue-500", "bg-green-500", "bg-pink-500", "bg-yellow-500"];

function Home({ data }) {
	return (
		<main className="dark:text-white dark:bg-zinc-800">
			<section className="h-[90vh] w-full relative">
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
						Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
						do eiusmod tempor incididunt ut labore et dolore magna aliqua.
					</span>
					<button>Learn More</button>
				</div>

				<div></div>
			</section>

			<section className="my-32">
				<FAQPage />
			</section>

			<section className="bg-secondary">
				<ScrollVelocityContainer className="text-4xl my-32 md:text-7xl md:leading-[5rem] font-bold tracking-[-0.02em]">
					<ScrollVelocityRow baseVelocity={5} direction={1}>
						Let us be you listening ear.{" "}
					</ScrollVelocityRow>
					<ScrollVelocityRow baseVelocity={5} direction={-1}>
						Let us be your listening ear.{" "}
					</ScrollVelocityRow>
				</ScrollVelocityContainer>{" "}
			</section>
			<section className="my-32">
				<h2>Some of our work</h2>
				<AccordionSlices />
			</section>
		</main>
	);
}

export default Home;
