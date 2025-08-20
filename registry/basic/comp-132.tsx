import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/registry/default/ui/checkbox";

export default function Component() {
	const id = useId();
	return (
		<div className="flex items-center gap-2">
			<Checkbox id={id} />
			<Label htmlFor={id}>Simple checkbox</Label>
		</div>
	);
}
