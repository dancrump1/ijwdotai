"use client";

import TextCurve from "@/registry/open-source/text-curve";

export default function TextCurveUsage() {
	return (
		<>
			<TextCurve marqueeText="Welcome to React Bits ✦" />
			<TextCurve
				marqueeText="Be ✦ Creative ✦ With ✦ React ✦ Bits ✦"
				speed={3}
				curveAmount={500}
				direction="right"
				interactive={true}
				className="custom-text-style"
			/>
			<TextCurve
				marqueeText="Smooth Curved Animation"
				speed={1}
				curveAmount={300}
				interactive={false}
			/>
		</>
	);
}
