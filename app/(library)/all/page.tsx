"use server";

import { getComponentFilesWithDates } from "@/lib/fetch";

import FlexWrapper from "../../../components/FlexWrapper";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const files = await getComponentFilesWithDates();
	const java_response = await fetch("http://localhost:8080/category/name");
	const java_data = await java_response.json();

	return <FlexWrapper files={files} java_data={java_data} />;
}
