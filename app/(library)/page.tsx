import Link from "next/link";

import { getComponentFilesWithDates } from "@/lib/fetch";
import { FlippingText } from "@/registry/open-source/flipping-text";

export default async function Page({}: {}) {
	const files = await getComponentFilesWithDates();
	const words = ["Designers", "Developers", "Content"];
	return (
		<div>
			<h1 className="mb-4 text-left text-2xl font-bold md:text-5xl">
				A collection and tool for <FlippingText words={words} />
			</h1>
			<p className="mt-4 text-left text-base text-neutral-600 dark:text-neutral-400">
				Web Design examples, Provided code, and integrated with Vercel's V0
				AI for generating content and structuring information
			</p>
			<span>{files.length} components available</span>
			<section className="flex gap-3 justify-center">
				<Link
					className="rounded-2xl w-fit border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-[transform,border-radius,box-shadow] duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_pink] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
					href={"/generate"}
				>
					CREATE
				</Link>
				<Link
					className="w-fit rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-[transform,border-radius,box-shadow] duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_pink] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
					href={"/find"}
				>
					SEE and LEARN
				</Link>
				<Link
					className="w-fit rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-[transform,border-radius,box-shadow] duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_pink] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
					href={"/credits"}
				>
					The MAD lads
				</Link>
				<Link
					className="w-fit rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-[transform,border-radius,box-shadow] duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_pink] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
					href={"/experiments"}
				>
					EXPERIMENTS
				</Link>
			</section>
		</div>
	);
}
