import { readdirSync, readFileSync } from "fs";
import path from "path";

import { NextRequest, NextResponse } from "next/server";

export async function GET(
	request: NextRequest,
	{ params }: { params: { component: string } }
) {
	const { component } = await params;

	// Basic sanitization
	const safeComponent = component.replace(/[^a-zA-Z0-9_-]/g, "");

	const directoryPath = path.join(process.cwd(), "registry/open-source");

	// Case-insensitive match
	const allFiles = readdirSync(directoryPath);
	const matchedFile = allFiles.find(
		(file) =>
			path.extname(file) === ".tsx" &&
			path.basename(file, ".tsx").toLowerCase() ===
				safeComponent.toLowerCase()
	);

	if (!matchedFile) {
		return NextResponse.json(
			{ error: "Component not found." },
			{ status: 404 }
		);
	}

	try {
		const filePath = path.join(directoryPath, matchedFile);
		const content = readFileSync(filePath, "utf-8");
		return new NextResponse(content, {
			status: 200,
			headers: {
				"Content-Type": "text/plain",
			},
		});
	} catch (err) {
		return NextResponse.json(
			{ error: "Error reading file." },
			{ status: 500 }
		);
	}
}
