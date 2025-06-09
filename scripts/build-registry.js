// scripts/build-registry.js
const fs = require("fs");
const path = require("path");

const registryDir = path.resolve(__dirname, "../registry");
const openSourceDir = path.join(registryDir, "open-source");
const examplesDir = path.join(registryDir, "examples");
const outputFile = path.join(registryDir, "registry_example.json");

const schemaUrl = "https://ui.shadcn.com/schema/registry.json";
const homepage = "https://acme.com";
const name = "acme";

function titleCase(str) {
	return str
		.replace(/([A-Z])/g, " $1")
		.replace(/^./, (char) => char.toUpperCase())
		.replace(/[-_]/g, " ")
		.trim();
}

function buildRegistry() {
	const files = fs
		.readdirSync(openSourceDir)
		.filter((f) => f.endsWith(".tsx"));

	const items = files.map((file) => {
		const componentName = path.basename(file, ".tsx");
		const exampleFile = `${componentName.toLowerCase()}example.tsx`;
		const examplePath = path.join(examplesDir, exampleFile);

		return {
			name: componentName.toLowerCase(),
			type: "registry:component",
			title: titleCase(componentName),
			description: titleCase(componentName),
			files: [
				fs.existsSync(examplePath)
					? {
							path: `registry/examples/${exampleFile}`,
							type: "registry:page",
							target: "~/example.tsx",
						}
					: null,
				{
					path: `registry/open-source/${file}`,
					type: "registry:ui",
					target: `components/${file}`,
				},
			].filter(Boolean),
		};
	});

	const registry = {
		$schema: schemaUrl,
		name,
		homepage,
		items,
	};

	fs.writeFileSync(outputFile, JSON.stringify(registry, null, 2));
	console.log(`✅ registry.json generated with ${items.length} components.`);
}

buildRegistry();
