import { Suspense } from "react";

import HomePage from "@/components/HomePage";
import { getComponentFilesWithDates } from "@/lib/fetch";

export default async function Page({}: {}) {
	const files = await getComponentFilesWithDates();

	return (
		<Suspense>
			<HomePage files={files} />
		</Suspense>
	);
}
