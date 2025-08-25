"use server";

import Link from "next/link";

export default async function Page() {
	return (
		<div>
			<Link href="/game">Phaser game</Link>
			<Link href="/drive25">Drive 2025</Link>
			<Link href="/oogity">v0 attachments test</Link>
		</div>
	);
}
