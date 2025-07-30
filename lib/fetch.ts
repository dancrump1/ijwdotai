"use server";

import fs from "fs";
import path from "path";

export async function isDateWithinLastWeek(targetDate: Date): Promise<boolean> {
	// Get today's date
	const today = new Date();

	// Calculate the date one week ago
	const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

	// Optional: For a strict "date only" comparison, zero out the time components
	// of both dates to ensure only the date part is considered.
	today.setHours(0, 0, 0, 0);
	oneWeekAgo.setHours(0, 0, 0, 0);
	targetDate?.setHours(0, 0, 0, 0);

	// Compare the target date to the date one week ago
	return (
		targetDate?.getTime() >= oneWeekAgo.getTime() &&
		targetDate?.getTime() <= today.getTime()
	);
}

export async function getComponentFilesWithDates(): Promise<
	{ name: string; isNew: Date }[]
> {
	const dirPath = path.join(process.cwd(), "public", "r");
	const publicPath = path.join(process.cwd(), "public");

	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

	try {
		const files = await fs.readdirSync(dirPath);
		const dates = await fs.readFileSync(
			publicPath + "/timeline.json",
			"utf-8"
		);

		const fileStats = await Promise.all(
			files.map(async (file, i) => {
				const fullPath = path.join(dirPath, file);
				const stat = await fs.statSync(fullPath);
				if (stat.isFile()) {
					return {
						name: file,
						isNew: new Date(JSON.parse(dates)[i].dateAdded),
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
