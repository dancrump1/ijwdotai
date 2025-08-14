"use client";

import React from "react";

import { products } from "@/components/usages/heroparallaxusage";
import CursorFollow from "@/registry/open-source/cursor-follow";
import HeroParallax from "@/registry/open-source/hero-parallax";
import { Fade, Slide } from "react-awesome-reveal";

const images = [
	{
		src: "/itjustworks.jpg",
		label: "Somethign about Cranmore",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about settlers green",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about State Parks",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about New Hampshire",
	},
	{
		src: "/itjustworks.jpg",
		label: "Somethign about Cranmore",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about settlers green",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about State Parks",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about New Hampshire",
	},
	{
		src: "/itjustworks.jpg",
		label: "Somethign about Cranmore",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about settlers green",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about State Parks",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about New Hampshire",
	},
	{
		src: "/itjustworks.jpg",
		label: "Somethign about Cranmore",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about settlers green",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about State Parks",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about New Hampshire",
	},
	{
		src: "/itjustworks.jpg",
		label: "Somethign about Cranmore",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about settlers green",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about State Parks",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about New Hampshire",
	},
	{
		src: "/itjustworks.jpg",
		label: "Somethign about Cranmore",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about settlers green",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about State Parks",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about New Hampshire",
	},
	{
		src: "/itjustworks.jpg",
		label: "Somethign about Cranmore",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about settlers green",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about State Parks",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about New Hampshire",
	},
	{
		src: "/itjustworks.jpg",
		label: "Somethign about Cranmore",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about settlers green",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about State Parks",
	},
	{
		src: "/itjustworks.jpg",
		label: "Something about New Hampshire",
	},
];

function Work() {
	return (
		<main className="dark:text-white dark:bg-zinc-800">
			<HeroParallax products={products} />
			<CursorFollow>
				<div className="flex flex-row items-center justify-center gap-8 py-8 flex-wrap overflow-hidden">
					{images.map((img, i) => (
						<Slide
							direction="up"
							delay={i % 2 === 0 ? 500 : 0}
							triggerOnce
						>
							<Fade
								fraction={0.5}
								duration={1000} // Animation duration
								triggerOnce // Animate only once
							>
								<div key={i} className="flex flex-col items-center">
									<img
										src={img.src}
										alt={img.label}
										data-cursor-text={img.label}
										className="border-background h-48 w-[33vw] rounded-xl object-cover transition-transform duration-200 hover:scale-105"
										// style={{ cursor: "none" }}
									/>
								</div>
							</Fade>
						</Slide>
					))}
				</div>
			</CursorFollow>
		</main>
	);
}

export default Work;
