import { Suspense } from "react";

import HomePage from "@/components/HomePage";
import { getComponentFilesWithDates } from "@/lib/fetch";

export default async function Page() {
	const files = await getComponentFilesWithDates();
	const api_res = await fetch("http://localhost:8080/category/name");
	const api_data = await api_res.json();

	return (
		<>
			{/* <div>{api_data}</div> */}
			<Suspense fallback={<span>Loading</span>}>
				{" "}
				<HomePage files={files} categories={api_data} />
			</Suspense>
		</>
	);
}
