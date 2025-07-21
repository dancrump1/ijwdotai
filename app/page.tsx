import fs from "fs";
import path from "path";

import Home from "./homepage";

function getComponentFiles(): string[] {
	const dirPath = path.join(process.cwd(), "public", "my-files");

	try {
		return fs.readdirSync(dirPath);
	} catch (err) {
		console.error("Error reading my-files directory:", err);
		return [];
	}
}

export default async function Page() {
	const componentFiles = "";

	return <Home files={getComponentFiles()} />;
}
