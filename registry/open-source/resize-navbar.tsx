"use client";

import React, { ReactNode, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { cn } from "@/registry/utilities/cn";
import {
	AnimatePresence,
	motion,
	useMotionValueEvent,
	useScroll,
} from "motion/react";
import { IoIosClose, IoIosMenu } from "react-icons/io";

type Props = {
	navItems: {
		link: string;
		title: string;
		target?: "_blank";
	}[];
};

const DesktopNavbar = ({ navItems }: Props) => {
	const { scrollY } = useScroll();

	const [showFloatingNav, setShowFloatingNav] = useState(false);

	useMotionValueEvent(scrollY, "change", (value) => {
		if (value > 100) {
			setShowFloatingNav(true);
		} else {
			setShowFloatingNav(false);
		}
	});
	return (
		<motion.div
			className={cn(
				"flex relative justify-between px-4 py-3 rounded-md  transition duration-200 bg-transparent mx-auto",
				!showFloatingNav && "w-full h-screen"
			)}
			animate={{
				width: showFloatingNav ? "80%" : "100%",
				height: showFloatingNav ? "0%" : "100%",
				background: showFloatingNav ? "var(--neutral-900)" : "transparent",
			}}
			transition={{
				duration: 0.4,
			}}
		>
			<AnimatePresence>
				{!showFloatingNav &&
					navItems.map((item, i) => (
						<div
							className={cn(
								"absolute",
								i === 0 && "top-0 inset-x-0 place-items-center",
								i === 1 && "right-0 inset-y-0 content-center",
								i === 2 && "bottom-0 inset-x-0 place-items-center",
								i === 3 && "left-0 inset-y-0 content-center"
							)}
						>
							<NavBarItem
								href={item.link}
								key={item.title}
								target={item.target}
							>
								{item.title}
							</NavBarItem>
						</div>
					))}
			</AnimatePresence>
			<AnimatePresence>
				{showFloatingNav && (
					<motion.div className="flex flex-row gap-2">
						{/* <Logo /> */}
						<div className="flex items-center gap-1.5">
							{navItems.map((item) => (
								<NavBarItem
									href={item.link}
									key={item.title}
									target={item.target}
								>
									{item.title}
								</NavBarItem>
							))}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};

const navItems = [
	{
		title: "Features",
		link: "/features",
	},
	{
		title: "Pricing",
		link: "/pricing",
	},

	{
		title: "Blog",
		link: "/blog",
	},
	{
		title: "Contact",
		link: "/contact",
	},
];

function ResizeNavBar() {
	return (
		<motion.nav
			initial={{
				y: -80,
			}}
			animate={{
				y: 0,
			}}
			transition={{
				ease: [0.6, 0.05, 0.1, 0.9],
				duration: 0.8,
			}}
			className="fixed inset-0  h-screen w-screen z-50"
		>
			<div className="hidden lg:block h-full w-full">
				<DesktopNavbar navItems={navItems} />
			</div>
			<div className="flex h-full w-full items-center lg:hidden ">
				<MobileNavbar navItems={navItems} />
			</div>
		</motion.nav>
	);
}

const MobileNavbar = ({ navItems }: any) => {
	const [open, setOpen] = useState(false);

	const { scrollY } = useScroll();

	const [showBackground, setShowBackground] = useState(false);

	useMotionValueEvent(scrollY, "change", (value) => {
		if (value > 100) {
			setShowBackground(true);
		} else {
			setShowBackground(false);
		}
	});

	return (
		<div
			className={cn(
				"flex justify-between bg-transparent items-center w-full rounded-md px-2.5 py-1.5 transition duration-200",
				showBackground &&
					" bg-neutral-900  shadow-[0px_-2px_0px_0px_var(--neutral-800),0px_2px_0px_0px_var(--neutral-800)]"
			)}
		>
			{/* <Logo /> */}
			<IoIosMenu
				className="text-white h-6 w-6"
				onClick={() => setOpen(!open)}
			/>
			{open && (
				<div className="fixed inset-0 bg-black z-50 flex flex-col items-start justify-start space-y-10  pt-5  text-xl text-zinc-600  transition duration-200 hover:text-zinc-800">
					<div className="flex items-center justify-between w-full px-5">
						{/* <Logo /> */}
						<div className="flex items-center space-x-2">
							<IoIosClose
								className="h-8 w-8 text-white"
								onClick={() => setOpen(!open)}
							/>
						</div>
					</div>
					<div className="flex flex-col items-start justify-start gap-[14px] px-8">
						{navItems.map((navItem: any, idx: number) => (
							<>
								{navItem.children && navItem.children.length > 0 ? (
									<>
										{navItem.children.map(
											(childNavItem: any, idx: number) => (
												<Link
													key={`link=${idx}`}
													href={childNavItem.link}
													onClick={() => setOpen(false)}
													className="relative max-w-[15rem] text-left text-2xl"
												>
													<span className="block text-white">
														{childNavItem.title}
													</span>
												</Link>
											)
										)}
									</>
								) : (
									<Link
										key={`link=${idx}`}
										href={navItem.link}
										onClick={() => setOpen(false)}
										className="relative"
									>
										<span className="block text-[26px] text-white">
											{navItem.title}
										</span>
									</Link>
								)}
							</>
						))}
					</div>
					<div className="flex flex-row w-full items-start gap-2.5  px-8 py-4 ">
						<Button>Book a demo</Button>
						<Button
							variant="simple"
							as={Link}
							href="/register"
							onClick={() => {
								setOpen(false);
							}}
						>
							Register
						</Button>
						{/* <ModeToggle /> */}
					</div>
				</div>
			)}
		</div>
	);
};

type NavBarItemProps = {
	href: string;
	children: ReactNode;
	active?: boolean;
	className?: string;
	target?: "_blank";
};

export function NavBarItem({
	children,
	href,
	active,
	target,
	className,
}: NavBarItemProps) {
	const pathname = usePathname();

	return (
		<Link
			href={href}
			className={cn(
				"flex items-center h-fit w-fit justify-center  text-sm leading-[110%] px-4 py-2 rounded-md text-white  hover:bg-neutral-800 hover:text-white/80 dark:text-white hover:shadow-[0px_1px_0px_0px_#FFFFFF20_inset] transition duration-200",
				(active || pathname?.includes(href)) &&
					"bg-transparent dark:text-white",
				className
			)}
			target={target}
		>
			{children}
		</Link>
	);
}

export default ResizeNavBar;
