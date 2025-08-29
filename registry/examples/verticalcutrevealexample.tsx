"use client";

import Image from "next/image";

import {
	ProgressCarousel,
	SliderBtn,
	SliderBtnGroup,
	SliderContent,
	SliderWrapper,
} from "@/components/ProgressCarousel";
import { Home } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";

// Credit:
// https://www.ui-layouts.com/components/progressive-carousel

export default function VerticalProgressCarousel() {
	const items = [
		{
			icon: <Home />,
			img: "/itjustworks.jpg",
			title: "Bridge",
			desc: "A breathtaking view of a city illuminated by countless lights, showcasing the vibrant and bustling nightlife.",
			sliderName: "bbridge",
		},
		{
			icon: <Home />,
			img: "/itjustworks.jpg",
			title: "Mountains View",
			desc: "A serene lake reflecting the surrounding mountains and trees, creating a mirror-like surface.",
			sliderName: "bmountains",
		},
		{
			icon: <Home />,
			img: "/itjustworks.jpg",
			title: "Autumn",
			desc: "A picturesque path winding through a dense forest adorned with vibrant autumn foliage.",
			sliderName: "bautumn",
		},
		{
			icon: <Home />,
			img: "/itjustworks.jpg",
			title: "Foggy",
			sliderName: "bfoggy",
			desc: "A stunning foggy view over the foresh, with the sun casting a golden glow across the forest. ",
		},
	];
	const isMobile = useMediaQuery("(min-width: 640px)");
	return (
		<ProgressCarousel
			vertical={isMobile ? true : false}
			fastDuration={300}
			duration={4000}
			activeSlider="bbridge"
			className="sm:flex "
		>
			<SliderBtnGroup className="sm:relative absolute bottom-0 lg:w-[28rem] sm:w-96 w-full z-10 sm:flex sm:flex-col grid grid-cols-2 sm:h-[500px] h-fit sm:dark:bg-black sm:bg-white dark:bg-black/80 bg-white/80 backdrop-blur-md overflow-hidden ">
				{items.map((item, index) => (
					<SliderBtn
						key={item?.sliderName + "button"}
						value={item?.sliderName + "button"}
						className="text-left  p-3 sm:border-b border sm:pl-5 sm:pb-0 pb-6 sm:flex-1"
						progressBarClass="left-0 sm:top-0 bottom-0 dark:bg-white bg-black sm:w-3 sm:h-full h-4  before:h-full before:w-4 before:"
					>
						<span className="relative px-4 rounded w-fit dark:bg-blue-500 bg-black text-white mb-2">
							{item.title}
						</span>
						<span className="text-sm font-medium dark:text-slate-200 text-slate-900 line-clamp-2">
							{item.desc}
						</span>
					</SliderBtn>
				))}
			</SliderBtnGroup>
			<SliderContent className="w-full">
				{items.map((item, index) => (
					<SliderWrapper
						className="h-full"
						key={item.sliderName + "wrapper"}
						value={item?.sliderName + "wrapper"}
					>
						<Image
							className=" h-[500px] object-cover"
							src={item.img}
							width={1900}
							height={1080}
							alt={item.desc}
						/>
					</SliderWrapper>
				))}
			</SliderContent>
		</ProgressCarousel>
	);
}
