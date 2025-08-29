"use client";

import { useState } from "react";

import { InputAnimated } from "@/components/InputAnimated";

const InputPreview = () => {
	const [value, setValue] = useState("");

	return (
		<InputAnimated
			label="Email Address"
			value={value}
			onChange={(e) => setValue(e.target.value)}
		/>
	);
};

export default InputPreview;
