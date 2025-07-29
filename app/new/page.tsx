"use server";

import { getComponentFilesWithDates, isDateWithinLastWeek } from "@/lib/fetch";

import FlexWrapper from "../../components/FlexWrapper";

export default async function Page({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const files = await getComponentFilesWithDates();

	return (
		<FlexWrapper
			files={files.filter(
				async (item) => await isDateWithinLastWeek(item.isNew)
			)}
		/>
	);
}
