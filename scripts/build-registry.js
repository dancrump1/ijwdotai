const fs = require("fs");
const path = require("path");

const registryDir = path.resolve(__dirname, "../registry");
const openSourceDir = path.join(registryDir, "open-source");
const examplesDir = path.join(registryDir, "examples");
const outputFile = path.join(registryDir, "registry.json");
const missingOutputFile = path.join(registryDir, "missing-components.json");

const schemaUrl = "https://ui.shadcn.com/schema/registry.json";
const homepage = "https://acme.com";
const name = "acme";

const registryMap = new Map(); // Track all added components

function titleCase(str) {
	return str
		.replace(/([A-Z])/g, " $1")
		.replace(/^./, (char) => char.toUpperCase())
		.replace(/[-_]/g, " ")
		.trim();
}

function extractRelativeImports(content) {
	const importRegex = /import\s+.*?['"](\.\/[^'"]+)['"]/g;
	const matches = [];
	let match;
	while ((match = importRegex.exec(content)) !== null) {
		matches.push(match[1]);
	}
	return matches;
}
const aliasMap = {
	"@/components/ui": path.join(process.cwd(), "components", "ui"),
	"@/lib": path.join(process.cwd(), "lib"),
};

function resolveImportPath(baseFilePath, importPath) {
	// Relative path
	if (importPath.startsWith(".") || importPath.startsWith("..")) {
		const fullPath = path.resolve(path.dirname(baseFilePath), importPath);
		if (fs.existsSync(`${fullPath}.tsx`)) return `${fullPath}.tsx`;
		if (fs.existsSync(`${fullPath}/index.tsx`))
			return `${fullPath}/index.tsx`;
	}

	// Aliased path
	for (const alias in aliasMap) {
		if (importPath.startsWith(alias)) {
			const relativeSubPath = importPath
				.replace(alias, "")
				.replace(/^\/+/, "");
			const fullPath = path.join(aliasMap[alias], relativeSubPath);
			if (fs.existsSync(`${fullPath}.tsx`)) return `${fullPath}.tsx`;
			if (fs.existsSync(`${fullPath}/index.tsx`))
				return `${fullPath}/index.tsx`;
		}
	}

	return null; // Unresolvable (probably an external library)
}

function addComponent(componentPath, examplePathMaybe = null) {
	const file = path.basename(componentPath);
	const componentName = path.basename(file, ".tsx");
	if (registryMap.has(componentName)) return;

	const exampleFilename = `${componentName.toLowerCase()}example.tsx`;
	const examplePath = path.join(examplesDir, exampleFilename);
	const exampleExists = fs.existsSync(examplePathMaybe || examplePath);

	if (!fs.existsSync(componentPath)) return;

	registryMap.set(componentName, true);

	const relativeComponentPath = path
		.relative(registryDir, componentPath)
		.replace(/\\/g, "/");

	const item = {
		name: componentName,
		type: "registry:component",
		title: titleCase(componentName),
		description: titleCase(componentName),
		files: [
			...(exampleExists
				? [
						{
							path: `registry/examples/${exampleFilename}`,
							type: "registry:page",
							target: "~/example.tsx",
						},
					]
				: []),
			{
				path: relativeComponentPath,
				type: "registry:ui",
				target: `components/${file}`,
			},
		],
	};

	return item;
}

function buildRegistry() {
	const files = fs
		.readdirSync(openSourceDir)
		.filter((f) => f.endsWith(".tsx"));

	const items = [];
	const missingComponents = [];

	for (const file of files) {
		const componentPath = path.join(openSourceDir, file);
		const content = fs.readFileSync(componentPath, "utf-8");

		const baseItem = addComponent(componentPath);
		if (!baseItem) {
			missingComponents.push({ name: file, missing: { component: true } });
			continue;
		}
		items.push(baseItem);

		// Parse and include dependencies
		const relImports = extractRelativeImports(content);
		for (const relImport of relImports) {
			const importedPath = resolveImportPath(componentPath, relImport);
			if (importedPath) {
				const depItem = addComponent(importedPath);
				if (depItem) items.push(depItem);
				else {
					missingComponents.push({
						name: relImport,
						missing: { component: true },
					});
				}
			}
		}
	}

	const registry = {
		$schema: schemaUrl,
		name,
		homepage,
		items,
	};

	fs.writeFileSync(outputFile, JSON.stringify(registry, null, 2));
	fs.writeFileSync(
		missingOutputFile,
		JSON.stringify(missingComponents, null, 2)
	);

	console.log(`✅ registry.json created with ${items.length} components.`);
	if (missingComponents.length > 0) {
		console.log(
			`⚠️ ${missingComponents.length} components skipped or not found. See missing-components.json`
		);
	}
}

buildRegistry();
