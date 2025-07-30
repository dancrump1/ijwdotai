const fs = require("fs");
const path = require("path");

/* ──────────────────────────────
   🔧  CONFIG
   ────────────────────────────── */
const registryDir = path.resolve(__dirname, "../registry");
const publicDir = path.resolve(__dirname, "../public");
const openSourceDir = path.join(registryDir, "open-source");
const examplesDir = path.join(registryDir, "examples");

const outputFile = path.join(registryDir, "registry.json");
const timelineFile = path.join(publicDir, "timeline.json");
const missingOutputFile = path.join(registryDir, "missing-components.json");
const incompleteExFile = path.join(registryDir, "incomplete-examples.json");

const schemaUrl = "https://ui.shadcn.com/schema/registry.json";
const homepage = "https://acme.com";
const name = "acme";

/* project-specific path aliases */
const aliasMap = {
	"@/public": path.join(process.cwd(), "public"),
	"@/components/ui": path.join(process.cwd(), "components", "ui"),
	"@/lib": path.join(process.cwd(), "lib"),
	"@/registry/open-source": path.join(
		process.cwd(),
		"registry",
		"open-source"
	),
};

/* ──────────────────────────────
   📦  STATE
   ────────────────────────────── */
const missingComponents = [];
const incompleteExamples = [];

/* ──────────────────────────────
   🛠 HELPERS
   ────────────────────────────── */
const titleCase = (s) =>
	s
		.replace(/[-_]/g, " ")
		.replace(/([A-Z])/g, " $1")
		.replace(/\s+/g, " ")
		.replace(/^./, (c) => c.toUpperCase())
		.trim();

const extractImports = (code) => {
	const rx = /import\s+.*?['"]([^'"]+)['"]/g;
	const out = [];
	for (let m; (m = rx.exec(code)); ) {
		const p = m[1];
		if (p.startsWith(".") || p.startsWith("@/")) out.push(p);
	}
	return out;
};

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

/* ──────────────────────────────
   🔁 Recursive File Scanner
   ────────────────────────────── */
function scanFileRecursively(absPath, seen = new Set()) {
	if (seen.has(absPath)) return [];

	if (!fs.existsSync(absPath)) {
		missingComponents.push({ path: absPath, reason: "file missing" });
		return [];
	}

	seen.add(absPath);

	const relPath = path.relative(registryDir, absPath).replace(/\\/g, "/");
	const target = relPath.startsWith("registry")
		? `components/${path.basename(absPath)}`
		: relPath.replace(/^.*?components\//, "components/");
	const stat = fs.statSync(absPath);

	const fileObj = {
		// Where the component lives in our codebase
		path: relPath,
		/*
			registry:block	Use for complex components with multiple files.
			registry:component	Use for simple components.
			registry:lib	Use for lib and utils.
			registry:hook	Use for hooks.
			registry:ui	Use for UI components and single-file primitives
			registry:page	Use for page or file-based routes.
			registry:file	Use for miscellaneous files.
			registry:style	Use for registry styles. eg. new-york
			registry:theme	Use for themes.
			registry:item	Use for universal registry items.
		*/
		type: "registry:ui",
		target,
		dateAdded: stat.birthtime,
	};

	const code = fs.readFileSync(absPath, "utf-8");
	const imports = extractImports(code);

	const children = imports.flatMap((imp) => {
		const resolved = resolveImportPath(absPath, imp);
		return resolved
			? scanFileRecursively(resolved, seen)
			: (() => {
					missingComponents.push({
						importedBy: path.relative(process.cwd(), absPath),
						importPath: imp,
						reason: "Import not resolvable",
					});
					return [];
				})();
	});

	return [fileObj, ...children];
}

/* ──────────────────────────────
   🧱 Build Registry Item
   ────────────────────────────── */
function buildRegistryItem(componentFile) {
	const absPath = path.join(openSourceDir, componentFile);
	const componentName = path.basename(componentFile, ".tsx");
	const seenFiles = new Set();

	const files = scanFileRecursively(absPath, seenFiles);

	// Ensure uniqueness per registry item
	const uniqueFiles = [];
	const added = new Set();
	for (const f of files) {
		if (!added.has(f.path)) {
			added.add(f.path);
			uniqueFiles.push(f);
		}
	}

	// TODO: Add handling from implementation files

	// Handle example if exists
	const exampleName = `${componentName.toLowerCase()}example.tsx`;
	const examplePath = path.join(examplesDir, exampleName);

	if (fs.existsSync(examplePath)) {
		const relExamplePath = `registry/examples/${exampleName}`;
		const content = fs.readFileSync(examplePath, "utf-8");
		const stat = fs.statSync(relExamplePath);

		if (/coming\s+soon/i.test(content)) {
			incompleteExamples.push({
				name: componentName,
				examplePath: relExamplePath,
				reason: "Placeholder content",
			});
		}
		uniqueFiles.unshift({
			path: relExamplePath,
			type: "registry:page",
			target: "~/example.tsx",
			dateAdded: stat.birthtime,
		});
	}

	if (!fs.existsSync(examplePath)) {
		const relExamplePath = `registry/examples/${exampleName}`;

		incompleteExamples.push({
			name: componentName,
			examplePath: relExamplePath,
			reason: "missing example",
		});

		const content = `
		"use client";

import React from "react";

export default function Example() {
    return (
        <div className="relative w-full flex items-center justify-center">
          
            
        </div>
    );
}
`;

		fs.writeFileSync(relExamplePath, content, "utf-8");
	}

	const stat = fs.statSync(absPath);

	return {
		name: componentName.toLowerCase(),
		type: "registry:component",
		title: titleCase(componentName),
		description: titleCase(componentName),
		dateAdded: stat.birthtime,
		files: uniqueFiles,
	};
}

/* ──────────────────────────────
   🏗️ Build Full Registry
   ────────────────────────────── */
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
	fs.writeFileSync(
		timelineFile,
		JSON.stringify(
			items.map(({ name, dateAdded }) => ({ name, dateAdded })),
			null,
			2
		)
	);
	fs.writeFileSync(
		missingOutputFile,
		JSON.stringify(missingComponents, null, 2)
	);
	fs.writeFileSync(
		incompleteExFile,
		JSON.stringify(incompleteExamples, null, 2)
	);

	console.log(`✅ registry.json written – ${items.length} components.`);
	if (missingComponents.length)
		console.log(
			`⚠️  ${missingComponents.length} missing/unresolvable items – see missing-components.json`
		);
	if (incompleteExamples.length)
		console.log(
			`📝 ${incompleteExamples.length} placeholder examples – see incomplete-examples.json`
		);
}

buildRegistry();
