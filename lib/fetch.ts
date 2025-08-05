"use server";

import fs from "fs";
import path from "path";

export async function getComponentFilesWithDates(): Promise<
	{ name: string; content: string }[]
> {
	const dirPath = path.join(process.cwd(), "public", "r");
	const compPath = path.resolve(process.cwd(), "registry", "open-source");

	try {
		const files = await fs.readdirSync(dirPath);

		const fileStats = await Promise.all(
			files.map(async (file, i) => {
				const updatedFileName = file;
				const fullPath = path.join(dirPath, updatedFileName);
				const fullCompPath = path.join(
					compPath,
					updatedFileName.replace(".json", ".tsx")
				);
				const stat = await fs.statSync(fullPath);
				const content = await fs.readFileSync(fullCompPath, "utf-8");
				if (stat.isFile()) {
					return {
						name: file,
						content,
					};
				}
				return null;
			})
		);

		// On the server, these are all just the same date.
		return fileStats.filter((item) => !!item?.name) as {
			name: string;
			content: string;
		}[];
	} catch (err) {
		console.error("Error reading directory:", err);
		return [];
	}
}
