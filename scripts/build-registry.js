const fs = require("fs");
const path = require("path");

/**
 * Absolute path to the registry directory.
 * @type {string}
 */
const registryDir = path.join(process.cwd(), "registry");

/**
 * Path to the open-source components directory.
 * @type {string}
 */
const openSourceDir = path.join(registryDir, "open-source");

/**
 * Path to the main registry output file.
 * @type {string}
 */
const outputFile = path.join(registryDir, "registry.json");

/**
 * JSON Schema URL for the registry file.
 * @type {string}
 */
const schemaUrl = "https://ui.shadcn.com/schema/registry.json";

/**
 * Homepage URL for the project.
 * @type {string}
 */
const homepage = "https://ijwdotai.com";

/**
 * Name of the registry/project.
 * @type {string}
 */
const name = "ijwdotai";

/**
 * Maps path aliases to actual directories for resolving imports.
 * @type {Object<string, string>}
 */
const aliasMap = {
	"@/public": path.join(process.cwd(), "public"),
	"@/components/ui": path.join(process.cwd(), "components", "ui"),
	"@/components/usages": path.join(process.cwd(), "components", "usages"),
	"@/lib": path.join(process.cwd(), "lib"),
	"@/registry/open-source": path.join(
		process.cwd(),
		"registry",
		"open-source"
	),
	"@/registry/utils": path.join(process.cwd(), "registry", "utils"),
};

/**
 * Converts a string into title case.
 * @param {string} s - Input string.
 * @returns {string} - Title-cased string.
 */
const titleCase = (s) =>
	s
		.replace(/[-_]/g, " ")
		.replace(/([A-Z])/g, " $1")
		.replace(/\s+/g, " ")
		.replace(/^./, (c) => c.toUpperCase())
		.trim();

/**
 * Extracts relative and aliased import paths from code.
 * @param {string} code - Source code to scan.
 * @returns {string[]} - Array of import paths.
 */
const extractImports = (code) => {
	const rx = /import\s+.*?['"]([^'"]+)['"]/g;
	const out = [];
	for (let m; (m = rx.exec(code)); ) {
		const p = m[1];
		if (p.startsWith(".") || p.startsWith("@/")) out.push(p);
	}
	return out;
};

/**
 * Resolves a file path from an import statement.
 * Supports relative and aliased imports.
 *
 * @param {string} from - File path from which the import originates.
 * @param {string} imp - Import path to resolve.
 * @returns {string|null} - Resolved file path, or null if not found.
 */
const resolveImportPath = (from, imp) => {
	if (imp.startsWith(".")) {
		const base = path.resolve(path.dirname(from), imp);
		if (fs.existsSync(base + ".tsx")) return base + ".tsx";
		if (fs.existsSync(base + ".ts")) return base + ".ts";
		if (fs.existsSync(base + "/index.tsx")) return base + "/index.tsx";
		if (fs.existsSync(base + "/index.ts")) return base + "/index.ts";
	}

	for (const alias in aliasMap) {
		if (imp.startsWith(alias)) {
			const sub = imp.replace(alias, "").replace(/^\/+/, "");
			const base = path.join(aliasMap[alias], sub);
			if (fs.existsSync(base + ".tsx")) return base + ".tsx";
			if (fs.existsSync(base + ".ts")) return base + ".ts";
			if (fs.existsSync(base + "/index.tsx")) return base + "/index.tsx";
			if (fs.existsSync(base + "/index.ts")) return base + "/index.ts";
		}
	}

	return null;
};

/**
 * Recursively scans a file and its import tree for registry-related metadata.
 *
 * @param {string} absPath - Absolute path to the starting file.
 * @param {Set<string>} [seen=new Set()] - Tracks visited files to prevent cycles.
 * @returns {{path: string; type: "registry:block" | "registry:component"|"registry:lib"|"registry:hook"|"registry:ui"|"registry:page"|"registry:file"|"registry:style"|"registry:theme"|"registry:item"}[]} - Array of file metadata objects.
 */
function scanFileRecursively(absPath, seen = new Set()) {
	if (seen.has(absPath)) return [];

	if (!fs.existsSync(absPath)) return [];

	seen.add(absPath);

	// Actual path to component within THIS library
	const relPath = path.relative(registryDir, absPath).replace(/\\/g, "/");
	// Path for inside v0 AI filesystem
	const target = relPath.startsWith("registry")
		? `components/${path.basename(absPath)}`
		: relPath.replace(/^.*?components\//, "components/").replace("../", "");

	const fileObj = {
		path: relPath,
		type: "registry:ui",
		target: target.replace("../", ""),
	};

	const code = fs.readFileSync(absPath, "utf-8");
	const imports = extractImports(code);

	const children = imports.flatMap((imp) => {
		const resolved = resolveImportPath(absPath, imp);
		return resolved ? scanFileRecursively(resolved, seen) : [];
	});

	return [fileObj, ...children];
}

/**
 * Builds a registry item for a given component file.
 * Adds the component file and all its dependencies, plus an optional example file.
 *
 * @param {string} componentFile - Filename of the component inside `openSourceDir`.
 * @returns {Object} - Registry item object.
 */
function buildRegistryItem(componentFile) {
	const absPath = path.join(openSourceDir, componentFile);
	const componentName = path.basename(componentFile, ".tsx");
	const seenFiles = new Set();

	const files = scanFileRecursively(absPath, seenFiles);

	const uniqueFiles = [];
	const added = new Set();
	for (const f of files) {
		if (!added.has(f.path)) {
			added.add(f.path);
			uniqueFiles.push(f);
		}
	}

	const exampleName = `${componentName.toLowerCase()}usage.tsx`;
	const examplePath = path.join("components/usages/", exampleName);

	if (fs.existsSync(examplePath)) {
		const relExamplePath = `components/usages/${exampleName}`;
		const content = fs.readFileSync(examplePath, "utf-8");

		uniqueFiles.unshift({
			path: relExamplePath,
			type: "registry:block",
			target: "~/example.tsx",
		});
	} else {
	}

	return {
		name: componentName.toLowerCase(),
		type: "registry:block",
		title: titleCase(componentName),
		description: titleCase(componentName),
		files: uniqueFiles,
	};
}

/**
 * Builds the full registry from all components in the open-source directory.
 * Writes the resulting JSON object to `registry.json`.
 */
function buildRegistry() {
	const componentFiles = fs
		.readdirSync(openSourceDir)
		.filter((f) => f.endsWith(".tsx"));

	const items = componentFiles.map(buildRegistryItem);

	const registry = {
		$schema: schemaUrl,
		name,
		homepage,
		items,
	};

	fs.writeFileSync(outputFile, JSON.stringify(registry, null, 2));
}

buildRegistry();
