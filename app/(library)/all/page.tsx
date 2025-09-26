"use server";

import { getComponentFilesWithDates } from "@/lib/fetch";

import FlexWrapper from "../../../components/FlexWrapper";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const files = await getComponentFilesWithDates();
	const java_response = await fetch("https://java.techdiff.io/category/name");
	const java_data = await java_response.text();

	return <FlexWrapper files={files} java_data={java_data} />;
}
