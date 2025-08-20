import { useId } from "react";

import { Label } from "@/components/ui/label";
import { Button } from "@/registry/default/ui/button";
import { Textarea } from "@/registry/default/ui/textarea";

export default function Component() {
	const id = useId();
	return (
		<div className="*:not-first:mt-2">
			<Label htmlFor={id}>Textarea with button</Label>
			<Textarea id={id} placeholder="Leave a comment" />
			<Button variant="outline" className="w-full">
				Send
			</Button>
		</div>
	);
}
