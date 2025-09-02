import { Suspense } from "react";

import ChatPage from "@/components/ClientChat";
import { getComponentFilesWithDates } from "@/lib/fetch";

export default async function Page() {
	const files = await getComponentFilesWithDates();

	const java_response = await fetch("http://localhost:8080/category/name");
	const java_data = await java_response.text();

	return (
		<Suspense fallback={<span>Loading</span>}>
			{" "}
			<ChatPage files={files} categories={java_data} />
		</Suspense>
	);
}
