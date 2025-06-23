"use client";

import Image from "next/image";

import { FullscreenImage } from "../open-source/FullscreenImage";

const Example = () => (
	<FullscreenImage>
		<Image
			alt="Placeholder image"
			className="h-auto w-96"
			height={800}
			src="/itjustworks.jpg"
			unoptimized
			width={1200}
		/>
	</FullscreenImage>
);
export default Example;
