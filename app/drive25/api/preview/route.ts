import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

import cmsClient from "@/lib/cmsClient";
import { gql } from "graphql-request";

// This matches GET /api/preview
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const token = searchParams.get("token");
	const entryUid = searchParams.get("entryUid");

	// Optionally validate token
	// if (!token) {
	//   return NextResponse.json({ message: 'Token missing' }, { status: 401 })
	// }

	const client = cmsClient(token || null);

	const pageQuery = gql`
		query ($uid: [String]) {
			entry(uid: $uid) {
				id
				uri
				typeHandle
			}
		}
	`;

	const data = await client.request(pageQuery, { uid: entryUid });

	if (!data?.entry?.uri) {
		return NextResponse.json(
			{ message: `URL of the entry ${entryUid} could not be fetched` },
			{ status: 404 }
		);
	}

	const { uri, typeHandle } = data.entry;
	const isHome = uri === "__home__" || uri === "home";
	const location = `/${isHome ? "drive25" : "drive25/" + uri}`;

	// In App Router, setPreviewData is still available but only in *pages router*
	// Instead, use draftMode()
	(await draftMode()).enable();

	// Store extra data in cookies if needed
	const response = NextResponse.redirect(new URL(location, request.url));
	response.cookies.set("entryUid", entryUid || "", { path: "/" });
	response.cookies.set("typeHandle", typeHandle || "", { path: "/" });
	response.cookies.set("token", token || "", { path: "/" });

	return response;
}
