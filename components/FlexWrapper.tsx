import { Suspense } from "react";

import { ClientWrapper } from "@/components/ClientWrapper";

export default function FlexWrapper({
	files,
	params,
}: {
	files: any;
	params?: any;
}) {
	return (
		<div className="flex flex-col min-h-svh px-4 py-8 gap-8">
			<Suspense>
				<ClientWrapper files={files} params={params} />
			</Suspense>
		</div>
	);
}
