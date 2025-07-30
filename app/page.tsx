import { Suspense } from "react";

import HomePage from "@/components/HomePage";
import V0Chat from "@/components/V0Chat";
import { getComponentFilesWithDates, isDateWithinLastWeek } from "@/lib/fetch";

export default async function Page({}: {}) {
	const files = await getComponentFilesWithDates();

	const newFiles = files.filter(async (item) => {
		return await isDateWithinLastWeek(item.isNew);
	});

	return (
		<>
			<Suspense>
				<HomePage files={files} newFiles={newFiles} />
			</Suspense>
			<V0Chat />
		</>
	);
}
