import { ClientWrapper } from "@/components/ClientWrapper";

export default function FlexWrapper({
	files,
	slug,
}: {
	files: any;
	slug?: string;
}) {
	return (
		<div className="flex flex-col min-h-svh px-4 py-8 gap-8">
			<ClientWrapper files={files} slug={slug} />
		</div>
	);
}
