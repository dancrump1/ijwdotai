import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/registry/default/ui/checkbox";

export default function Component() {
	const id = useId();
	return (
		<div className="flex items-center justify-between gap-2">
			<Checkbox id={id} className="order-1" />
			<Label htmlFor={id}>Right aligned checkbox</Label>
		</div>
	);
}
