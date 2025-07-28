"use server";

import fs from "fs";
import path from "path";

function isDateWithinLastWeek(targetDate: Date) {
	// Get today's date
	const today = new Date();

	// Calculate the date one week ago
	const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds

	// Optional: For a strict "date only" comparison, zero out the time components
	// of both dates to ensure only the date part is considered.
	today.setHours(0, 0, 0, 0);
	oneWeekAgo.setHours(0, 0, 0, 0);
	targetDate.setHours(0, 0, 0, 0);

	// Compare the target date to the date one week ago
	return (
		targetDate.getTime() >= oneWeekAgo.getTime() &&
		targetDate.getTime() <= today.getTime()
	);
}

export async function getComponentFilesWithDates(): Promise<
	{ name: string; isNew: boolean }[]
> {
	const dirPath = path.join(process.cwd(), "public", "r");

	try {
		const files = await fs.readdirSync(dirPath);
		const fileStats = await Promise.all(
			files.map(async (file) => {
				const fullPath = path.join(dirPath, file);
				const stat = await fs.statSync(fullPath);
				if (stat.isFile()) {
					console.log("stat.birthtime");
					console.log(stat.birthtime);
					return {
						name: file,
						isNew: isDateWithinLastWeek(stat.birthtime),
					};
				}
				return null;
			})
		);

		return fileStats.filter(Boolean) as { name: string; isNew: boolean }[];
	} catch (err) {
		console.error("Error reading directory:", err);
		return [];
	}
}
