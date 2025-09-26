import { Suspense } from "react";

import HomePage from "@/components/HomePage";
import { getComponentFilesWithDates } from "@/lib/fetch";

export default async function Page() {
	const files = await getComponentFilesWithDates();
	const api_res = await fetch("https://java.techdiff.io/category/name", {
		method: "GET",
		headers: { Authorization: "Basic " + btoa("john:test123") },
	});
	const api_data = await api_res.json();

	console.log(api_data);

	return (
		<>
			{/* <div>{api_data}</div> */}
			<Suspense fallback={<span>Loading</span>}>
				<HomePage files={files} categories={api_data} />
			</Suspense>
		</>
	);
}
