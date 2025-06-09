"use client";

import React from "react";

import MouseFollower from "../open-source/FollowCursor";

export default function Example() {
	const [mouseFollowerContainer, setMouseFollowerContainer] = useState();

	useEffect(() => {
		if (window !== undefined) {
			setMouseFollowerContainer(document.getElementById("mouseFollower"));
		}
	}, []);

	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<div className="w-full h-[33vh] relative" id="mouseFollower">
				<MouseFollower container={mouseFollowerContainer} />
			</div>
		</div>
	);
}
