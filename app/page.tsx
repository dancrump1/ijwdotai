import { Suspense } from "react";

import HomePage from "@/components/HomePage";
import V0Chat from "@/components/V0Chat";
import { getComponentFilesWithDates } from "@/lib/fetch";

export default async function Page({}: {}) {
	const files = await getComponentFilesWithDates();

	return (
		<>
			<Suspense>
				<HomePage files={files} />
				<V0Chat files={files} />
			</Suspense>
		</>
	);
}
