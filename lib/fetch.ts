"use server";

import fs from "fs";
import path from "path";

export async function getComponentFilesWithDates(): Promise<
	{ name: string; content: string }[]
> {
	const dirPath = path.join(process.cwd(), "public", "r");
	const compPath = path.resolve(process.cwd(), "registry", "open-source");
	const basicCompPath = path.resolve(process.cwd(), "registry", "basic");

	try {
		const files = await fs.readdirSync(dirPath);

		const fileStats = await Promise.all(
			files.map(async (file, i) => {
				const updatedFileName = file;
				const fullPath = path.join(dirPath, updatedFileName);
				let fullCompPath, content;
				const stat = await fs.statSync(fullPath);

				if (!file.includes('comp-')) {

					fullCompPath = path.join(
						compPath,
						updatedFileName.replace(".json", ".tsx")
					);
					content = await fs.readFileSync(fullCompPath, "utf-8");
				} else {
					console.log(updatedFileName)

					fullCompPath = path.join(
						basicCompPath,
						updatedFileName
					);
					content = await fs.readFileSync(path.join(basicCompPath, updatedFileName.replace('.json', '.tsx')), 'utf-8')

				}
				if (stat.isFile()) {
					return {
						name: file,
						content,
					};
				} else if (path.join(basicCompPath, updatedFileName)) {
					return {
						name: file,
						content
					}
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
