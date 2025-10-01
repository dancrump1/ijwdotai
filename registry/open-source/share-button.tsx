"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/registry/utilities/cn";
import { LucideIcon } from "lucide-react";

interface ShareLink {
	icon: LucideIcon;
	href?: string;
	onClick?: () => void;
	label?: string;
}

interface ShareButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	links: ShareLink[];
	children: React.ReactNode;
}

const ShareButton = ({
	className,
	links,
	children,
	...props
}: ShareButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<span
				className={cn(
					"relative h-10 min-w-40 inline-flex items-center justify-center whitespace-nowrap text-sm text-white hover:text-gray-400 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 rounded-3xl ",
					"bg-background dark:bg-background",
					"hover:bg-background dark:hover:bg-background",
					"text-foreground dark:text-foreground",
					"border border-black/10 dark:border-white/10",
					"transition-[opacity,background-color,color,border-color] duration-300",
					isHovered ? "opacity-0" : "opacity-100",
					className
				)}
				{...props}
			>
				<span className="flex items-center gap-2">{children}</span>
			</span>

			<div className="absolute left-0 w-full top-0 flex h-10 group">
				{links.map((link, index) => {
					const Icon = link.icon;
					return (
						<button
							type="button"
							key={index + "share-button"}
							onClick={link.onClick}
							className={cn(
								"h-10",
								"w-fit flex-1",
								"flex items-center justify-center",
								"bg-background dark:bg-background",
								"text-foreground dark:text-foreground",
								"transition-all duration-300",
								index === 0 && "rounded-l-3xl",
								index === links.length - 1 && "rounded-r-3xl",
								"border-r border-white/10 last:border-r-0 dark:border-black/10",
								"hover:bg-background dark:hover:bg-background",
								"group-hover:pointer-events-auto pointer-events-none group/button",
								isHovered
									? "translate-x-0 opacity-100"
									: "-translate-x-full opacity-0",
								index === 0 && "duration-200",
								index === 1 && "delay-[50ms] duration-200",
								index === 2 && "delay-100 duration-200",
								index === 3 && "delay-150 duration-200"
							)}
						>
							{link?.icon ? (
								<Icon className="size-4" />
							) : (
								<span
									className={cn(
										"group-hover/button:bg-black group-hover/button:text-white block h-full w-full content-center pointer-events-none group-hover:pointer-events-auto",
										index === 0 && "rounded-l-3xl",
										index === links.length - 1 && "rounded-r-3xl"
									)}
								>
									{link.label}
								</span>
							)}
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default ShareButton;
