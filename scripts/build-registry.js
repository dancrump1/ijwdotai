const fs = require("fs");
const path = require("path");

// Core paths
const registryPath = path.join(process.cwd(), "registry");
const openSourcePath = path.join(registryPath, "open-source");
const openSourceBasicPath = path.join(registryPath, "basic");
const registryUtilsPath = path.join(registryPath, "utilities");
const usagesPath = path.join(process.cwd(), "components", "usages");

// Metadata
const registrySchemaUrl = "https://ui.shadcn.com/schema/registry.json";
const registryName = "DriveBrandStudio";
const registryHomepage = "https://components.drivedev.net/";

// Path aliases for resolving imports
const aliasPaths = {
	"@/public": path.join(process.cwd(), "public"),
	"@/components/ui": path.join(process.cwd(), "components", "ui"),
	"@/components/usages": usagesPath,
	"@/registry/open-source": openSourcePath,
	"@/registry/utilities": registryUtilsPath,
};

// Helpers
const toTitleCase = (str) =>
	str
		.replace(/[-_]/g, " ")
		.replace(/([A-Z])/g, " $1")
		.replace(/\s+/g, " ")
		.replace(/^./, (c) => c.toUpperCase())
		.trim();

const extractImports = (code) =>
	[...code.matchAll(/import\s+.*?['"]([^'"]+)['"]/g)]
		.map((match) => match[1])
		.filter((imp) => imp.startsWith(".") || imp.startsWith("@/"));

const resolveImportPath = (sourcePath, importPath) => {
	const tryExtensions = (base) =>
		[".tsx", ".ts", "/index.tsx", "/index.ts"]
			.map((ext) => base + ext)
			.find(fs.existsSync);

	if (importPath.startsWith(".")) {
		return tryExtensions(path.resolve(path.dirname(sourcePath), importPath));
	}

	for (const alias in aliasPaths) {
		if (importPath.startsWith(alias)) {
			const subPath = importPath.replace(alias, "").replace(/^\/+/, "");
			return tryExtensions(path.join(aliasPaths[alias], subPath));
		}
	}

	return null;
};

const scanFileRecursively = (absolutePath, visitedFiles = new Set()) => {
	if (visitedFiles.has(absolutePath) || !fs.existsSync(absolutePath))
		return [];
	visitedFiles.add(absolutePath);

	let relativePath = path
		.relative(registryPath, absolutePath)
		.replace(/\\/g, "/");

	// Prefix registry subfolders
	if (
		relativePath.startsWith("open-source/") ||
		relativePath.startsWith("utilities/")
	) {
		relativePath = `registry/${relativePath}`;
	}

	// Target path rules
	let targetPath;
	if (relativePath.startsWith("registry/open-source/")) {
		targetPath = `components/${path.basename(absolutePath)}`;
	} else if (relativePath.startsWith("registry/")) {
		targetPath = relativePath.replace(/^registry\//, "");
	} else {
		targetPath = relativePath;
	}

	// Only normalize "../" → "./" for registry files
	const normalizeDots = (p) =>
		p.startsWith("registry/") ? p.replace(/^(\.\.\/)+/, "./") : p;

	const fileData = {
		path: normalizeDots(relativePath).replace("../", ""),
		type: "registry:ui",
		// target: normalizeDots(targetPath).replace("../", ""),
	};

	const imports = extractImports(fs.readFileSync(absolutePath, "utf-8"));
	const childFiles = imports
		.map((imp) => resolveImportPath(absolutePath, imp))
		.filter(Boolean)
		.flatMap((resolvedPath) =>
			scanFileRecursively(resolvedPath, visitedFiles)
		);

	return [fileData, ...childFiles];
};

function getFileWithFolderName(baseDir, folderName) {
	const folderPath = path.join(baseDir, folderName);

	// Check if folder exists and is actually a directory
	if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
		const filePath = path.join(folderPath, folderName);

		// If you expect an extension, you can adjust this part
		// Example: looking for folderName + ".txt"
		const matchingFile = fs
			.readdirSync(folderPath)
			.find(
				(file) => file === folderName || file.startsWith(folderName + ".")
			);

		if (matchingFile) {
			const fullFilePath = path.join(folderPath, matchingFile);
			const fileContent = fs.readFileSync(fullFilePath, "utf8");
			return { filePath: fullFilePath, content: fileContent };
		} else {
			console.log(
				`No file named "${folderName}" found inside "${folderPath}".`
			);
			return null;
		}
	} else {
		console.log(`Folder "${folderPath}" does not exist.`);
		return null;
	}
}

const buildRegistryItem = (usageFile, allComponentFiles) => {
	const componentFileName = allComponentFiles.find((item) => {
		return (
			item.replaceAll("-", "") === usageFile.replace("usage", "") ||
			!!getFileWithFolderName(usagesPath, usageFile.replace("usage", ""))
		);
	});

	if (!componentFileName) return null;
	const absoluteComponentPath = path.join(openSourcePath, componentFileName);
	const componentName = path.basename(componentFileName, ".tsx");

	const allFiles = scanFileRecursively(absoluteComponentPath);
	const uniqueFiles = Array.from(
		new Map(allFiles.map((f) => [f.path, f])).values()
	);

	const exampleFileName = `${componentName.toLowerCase().replaceAll("-", "")}usage.tsx`;
	const exampleFilePath = path.join(
		process.cwd(),
		"components/usages",
		exampleFileName
	);

	if (fs.existsSync(exampleFilePath)) {
		uniqueFiles.unshift({
			path: `components/usages/${exampleFileName}`,
			type: "registry:block",
			target: "~/example.tsx",
		});
	}

	return {
		name: componentName.toLowerCase(),
		type: "registry:block",
		title: toTitleCase(componentName),
		description: toTitleCase(componentName),
		files: uniqueFiles,
	};
};

// generate .json file containing contents of ShadCN Registry
const buildRegistry = () => {
	const allUsageFiles = fs
		.readdirSync(usagesPath)
		.filter((f) => f.endsWith(".tsx"));

	const componentFiles = fs
		.readdirSync(openSourcePath)
		.filter((f) => f.endsWith(".tsx"));

	const basicFiles = fs
		.readdirSync(openSourceBasicPath)
		.filter((f) => f.endsWith(".tsx") && f.includes("-"));

	const registryItems = allUsageFiles
		.map((item) => buildRegistryItem(item, componentFiles))
		.filter(Boolean);

	const basicRegistryItems = basicFiles.map((file) => {
		return {
			name: file,
			type: "registry:component",
			files: [
				{
					type: "registry:component",
					path: "registry/basic/" + file,
				},
			],
		};
	});

	const registryData = {
		$schema: registrySchemaUrl,
		name: registryName,
		homepage: registryHomepage,
		items: [...registryItems, ...basicRegistryItems],
	};

	fs.writeFileSync(
		path.join(process.cwd(), "registry.json"),
		JSON.stringify(registryData, null, 2)
	);
};

// Starting point
buildRegistry();
