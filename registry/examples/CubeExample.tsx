import { useRef } from "react";

import Image from "next/image";

import CSSBox, { CSSBoxRef } from "@/components/CSSBox";
import { Button } from "@/components/ui/button";

export default function CubeExample() {
	const cubeRef = useRef<CSSBoxRef>(null);

	return (
		<>
			<CSSBox
				ref={cubeRef}
				width={220}
				height={220}
				depth={220}
				perspective={800}
				draggable
				faces={{
					front: (
						<Image
							width={100}
							height={100}
							src="/itjustworks.jpg"
							alt="Front"
						/>
					),
					back: (
						<Image
							src="/itjustworks.jpg"
							width={100}
							height={100}
							alt="Back"
						/>
					),
					left: (
						<Image
							width={100}
							height={100}
							src="/itjustworks.jpg"
							alt="Left"
						/>
					),
					right: (
						<Image
							src="/itjustworks.jpg"
							width={100}
							height={100}
							alt="Right"
						/>
					),
					top: (
						<Image
							width={100}
							height={100}
							src="/itjustworks.jpg"
							alt="Top"
						/>
					),
					bottom: (
						<Image
							width={100}
							height={100}
							src="/itjustworks.jpg"
							alt="Bottom"
						/>
					),
				}}
			/>

			<Button onClick={() => cubeRef.current?.showTop()}>Show Top</Button>
		</>
	);
}
