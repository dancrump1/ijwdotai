import { Suspense } from "react";

import HomePage from "@/components/HomePage";
import { getComponentFilesWithDates } from "@/lib/fetch";

export default async function Page() {
	const files = await getComponentFilesWithDates();
	const api_res = await fetch(
		"http://java-backend.rbxjcxt2ry-pxr4k55zr4gn.p.temp-site.link/category/name"
	);
	const api_data = await api_res.json();

	console.log(api_data);

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
