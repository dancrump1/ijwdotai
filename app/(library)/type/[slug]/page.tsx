"use server";

import { getComponentFilesWithDates } from "@/lib/fetch";

import FlexWrapper from "../../../../components/FlexWrapper";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const thing = await getComponentFilesWithDates();
	return <FlexWrapper files={thing} params={await params} />;
}
