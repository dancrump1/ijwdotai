import { promises as fs } from "fs";
import path from "path";

import Home from "./homepage";

const registryDir = path.resolve(
	"/home/dan/shadcn-style-lib/registry",
	"../registry"
);

const openSourceDir = path.join(registryDir, "open-source");

export default async function Page() {
	const componentFiles = await fs.readdir(openSourceDir);

	return <Home files={componentFiles} />;
}
