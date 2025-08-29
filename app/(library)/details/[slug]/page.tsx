import React from "react";

import { pages } from "@/registry/open-source/page-transitions/data";
import DetailPage from "@/registry/open-source/page-transitions/DetailPage";

export async function generateStaticParams() {
	return pages.map((page) => ({
		slug: page.slug,
	}));
}

export default async function Detail({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const pageContent = pages.find((page) => page.slug === slug);
	return <DetailPage pageContent={pageContent} />;
}
