"use client";

import TextCurve from "../open-source/TextCurve";

export default function TextCurveExample() {
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
