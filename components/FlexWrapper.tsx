import { Suspense } from "react";

import { ClientWrapper } from "@/components/ClientWrapper";

export default function FlexWrapper({
	files,
	params,
	java_data,
}: {
	files: any;
	params?: any;
	java_data?: any;
}) {
	return (
		<div className="flex flex-col min-h-svh px-4 py-8 gap-8">
			<Suspense fallback={<span>Loading</span>}>
				<ClientWrapper
					files={files}
					params={params}
					java_data={java_data}
				/>
			</Suspense>
		</div>
	);
}
