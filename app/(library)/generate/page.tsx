import { Suspense } from "react";

import V0Chat from "@/components/V0Chat";
import { getComponentFilesWithDates } from "@/lib/fetch";

export default async function Page() {
	const files = await getComponentFilesWithDates();

	const java_response = await fetch(
		process.env.NEXT_PUBLIC_API_URL + "/category/name",
		{
			method: "GET",
			headers: { Authorization: "Basic " + btoa("john:test123") },
		}
	);
	const java_data = await java_response.json();

	return (
		<>
			<Suspense fallback={<span>Loading</span>}>
				{" "}
				<V0Chat files={files} categories={java_data} />
			</Suspense>
		</>
	);
}
