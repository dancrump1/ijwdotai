import { Suspense } from "react";

import ChatPage from "@/components/ClientChat";
import { getComponentFilesWithDates } from "@/lib/fetch";

export default async function Page() {
	const files = await getComponentFilesWithDates();

	return (
		<Suspense>
			<ChatPage files={files} />
		</Suspense>
	);
}
