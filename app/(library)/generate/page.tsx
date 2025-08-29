import { Suspense } from "react";

import V0Chat from "@/components/V0Chat";
import { getComponentFilesWithDates } from "@/lib/fetch";

export default async function Page() {
	const files = await getComponentFilesWithDates();

	const java_response = await fetch("http://localhost:8080/components/name");
	const java_data = await java_response.text();

	return (
		<>
			<Suspense fallback={<span>Loading</span>}>
				{" "}
				<V0Chat files={files} categories={java_data} />
			</Suspense>
		</>
	);
}
