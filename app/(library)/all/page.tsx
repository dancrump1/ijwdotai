"use server";

import { getComponentFilesWithDates } from "@/lib/fetch";

import FlexWrapper from "../../../components/FlexWrapper";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const files = await getComponentFilesWithDates();
	const java_response = await fetch(
		process.env.NEXT_PUBLIC_API_URL + "/category/name",
		{
			method: "GET",
			headers: { Authorization: "Basic " + btoa("john:test123") },
		}
	);
	const java_data = await java_response.json();

	return <FlexWrapper files={files} java_data={java_data} />;
}
