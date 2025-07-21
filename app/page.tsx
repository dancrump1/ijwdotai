import fs from "fs";
import path from "path";

import Home from "./homepage";

function getComponentFiles(): string[] {
	const dirPath = path.join(process.cwd(), "public", "r");

	try {
		return fs
			.readdirSync(dirPath)
			.filter((file) => fs.statSync(path.join(dirPath, file)).isFile()); // Only return file names
	} catch (err) {
		console.error("Error reading directory:", err);
		return [];
	}
}
export default async function Page() {
	return <Home files={getComponentFiles()} />;
}
