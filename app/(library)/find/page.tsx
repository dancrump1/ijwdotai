import { Suspense } from "react";

import HomePage from "@/components/HomePage";
import { getComponentFilesWithDates } from "@/lib/fetch";

export default async function Page() {
	const files = await getComponentFilesWithDates();
	const api_res = await fetch("https://java.techdiff.io/category/name", {
		method: "GET",
		headers: { Authorization: "Basic " + btoa("john:test123") },
	});
	const api_comps = await fetch("https://java.techdiff.io/components/name", {
		method: "GET",
		headers: { Authorization: "Basic " + btoa("john:test123") },
	});

	return (
		<>
			{/* <div>{api_data}</div> */}
			<Suspense fallback={<span>Loading</span>}>
				<HomePage
					files={files}
					categories={await api_res.json()}
					api_comps={await api_comps.json()}
				/>
			</Suspense>
		</>
	);
}
