import { ModeToggle } from "@/components/ui/mode-toggle";

// https://www.hover.dev/components/heros
export const NavBar3 = () => {
	return (
		<nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white">
			<div className="text-black dark:text-white">logo</div>
			<section className="flex gap-2">
				<button
					// onClick={() => {
					//   document.getElementById("launch-schedule")?.scrollIntoView({
					//     behavior: "smooth",
					//   });
					// }}
					className="flex items-center gap-1 text-xs hover:text-pink-900 dark:hover:text-pink-300 text-zinc-900 dark:text-zinc-400"
				>
					Nav Button
				</button>
				<ModeToggle />
			</section>
		</nav>
	);
};
