"use server";

import fs from "fs";
import path from "path";

import HomePage from "@/components/HomePage";

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

function getComponentFilesWithDates(): { name: string; isNew: boolean }[] {
	const dirPath = path.join(process.cwd(), "public", "r");

	try {
		return fs
			.readdirSync(dirPath)
			.filter((file) => fs.statSync(path.join(dirPath, file)).isFile())
			.map((file) => {
				const fullPath = path.join(dirPath, file);
				const stats = fs.statSync(fullPath);
				return {
					name: file,
					isNew: isDateWithinLastWeek(stats.birthtime), // Convert to string for client
				};
			});
	} catch (err) {
		console.error("Error reading directory:", err);
		return [];
	}
}

export default async function Page({}: {}) {
	const files = getComponentFilesWithDates();

	return <HomePage files={files} />;
}
