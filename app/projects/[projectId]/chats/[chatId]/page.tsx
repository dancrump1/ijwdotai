import { Suspense } from "react";

import ChatPage from "@/components/ClientChat";
import { getComponentFilesWithDates } from "@/lib/fetch";

export default async function Page() {
	const files = await getComponentFilesWithDates();

	return (
		<Suspense fallback={<span>Loading</span>}>
			{" "}
			<ChatPage files={files} />
		</Suspense>
	);
}
