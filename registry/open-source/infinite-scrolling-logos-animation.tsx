import React from "react";

import Image from "next/image";

import { motion } from "framer-motion";

const CompanyLogoData: Array<{ src: any; alt: string }> = [
	{ src: "/itjustworks.jpg", alt: "Acme Logo" },
	{ src: "/itjustworks.jpg", alt: "Quantum Logo" },
	{ src: "/itjustworks.jpg", alt: "Echo Logo" },
	{ src: "/itjustworks.jpg", alt: "Celestial Logo" },
	{ src: "/itjustworks.jpg", alt: "Pulse Logo" },
	{ src: "/itjustworks.jpg", alt: "Apex Logo" },
];

const InfiniteScrollingLogosAnimation = () => {
	return (
		<div className="flex py-8 relative overflow-hidden before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-10 before:bg-gradient-to-r before:from-background before:to-transparent before:content-[''] after:absolute after:right-0 after:top-0 after:h-full after:w-10 after:bg-gradient-to-l after:from-background after:to-transparent after:content-['']">
			<motion.div
				transition={{
					duration: 30,
					ease: "linear",
					repeat: Infinity,
				}}
				initial={{ translateX: 0 }}
				animate={{ translateX: "-50%" }}
				className="flex flex-none gap-16 pr-16"
			>
				{[...new Array(5)].fill(0).map((_, index) => (
					<React.Fragment key={index + "infinite-scroll-logo"}>
						{CompanyLogoData.map(({ src, alt }) => (
							<Image
								key={alt}
								src={src}
								alt={alt}
								height={20}
								width={20}
								className="h-8 w-auto flex-none"
							/>
						))}
					</React.Fragment>
				))}
			</motion.div>
		</div>
	);
};

export default InfiniteScrollingLogosAnimation;
