import { Suspense } from "react";

import HomePage from "@/components/HomePage";
import { getComponentFilesWithDates } from "@/lib/fetch";

export default async function Page() {
	const files = await getComponentFilesWithDates();
	const api_res = await fetch(
		process.env.NEXT_PUBLIC_API_URL + "/category/name",
		{
			method: "GET",
			headers: { Authorization: "Basic " + btoa("john:test123") },
		}
	);
	const api_comps = await fetch(
		process.env.NEXT_PUBLIC_API_URL + "/components/name",
		{
			method: "GET",
			headers: { Authorization: "Basic " + btoa("john:test123") },
		}
	);

	const response = await api_res.json();
	const comps = await api_comps.json();

	console.log("await api_res");
	console.log(response);
	console.log(comps);

	return (
		<>
			{/* <div>{api_data}</div> */}
			<Suspense fallback={<span>Loading</span>}>
				<HomePage files={files} categories={response} api_comps={comps} />
			</Suspense>
		</>
	);
}
