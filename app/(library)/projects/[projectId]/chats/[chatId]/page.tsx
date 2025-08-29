import { Suspense } from "react";

import ChatPage from "@/components/ClientChat";
import { getComponentFilesWithDates } from "@/lib/fetch";

export default async function Page() {
	const files = await getComponentFilesWithDates();

	const java_response = await fetch(
		"http://java-backend.rbxjcxt2ry-pxr4k55zr4gn.p.temp-site.link/category/name"
	);
	const java_data = await java_response.text();

	return (
		<Suspense fallback={<span>Loading</span>}>
			{" "}
			<ChatPage files={files} categories={java_data} />
		</Suspense>
	);
}
