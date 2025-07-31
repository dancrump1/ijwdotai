"use server";

import fs from "fs";
import path from "path";

export async function getComponentFilesWithDates(): Promise<
	{ name: string; isNew: Date }[]
> {
	const dirPath = path.join(process.cwd(), "public", "r");

	try {
		const files = await fs.readdirSync(dirPath);

		const fileStats = await Promise.all(
			files.map(async (file, i) => {
				const fullPath = path.join(dirPath, file);
				const stat = await fs.statSync(fullPath);
				if (stat.isFile()) {
					return {
						name: file,
					};
				}
				return null;
			})
		);

		// On the server, these are all just the same date.
		return fileStats.filter(Boolean) as { name: string; isNew: Date }[];
	} catch (err) {
		console.error("Error reading directory:", err);
		return [];
	}
}
