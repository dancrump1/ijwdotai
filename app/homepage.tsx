"use client";

import React from "react";

import { ClientWrapper } from "@/components/ClientWrapper";

export default function Home({ files }: { files: any }) {
	return (
		<div className="flex flex-col min-h-svh px-4 py-8 gap-8">
			<ClientWrapper files={files} />
		</div>
	);
}
