"use client";

import { useId, useState } from "react";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/registry/default/ui/checkbox";

export default function Component() {
	const id = useId();
	const [checked, setChecked] = useState<boolean | "indeterminate">(
		"indeterminate"
	);

	return (
		<div className="flex items-center gap-2">
			<Checkbox id={id} checked={checked} onCheckedChange={setChecked} />
			<Label htmlFor={id}>Indeterminate checkbox</Label>
		</div>
	);
}
