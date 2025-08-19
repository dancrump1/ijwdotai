"use client";

import React from "react";

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import TourFactory from "@/registry/open-source/tour";

import { Button } from "../ui/button";
import { Input } from "../ui/input";

const tour = TourFactory(["example1", "example2", "emailInput"]);

export function TourDisplay(props: {
	children: React.ReactNode;
	title?: string;
	description?: string;
}) {
	const ctx = tour.useContext();
	return (
		<Card className="w-[350px]">
			<CardHeader>
				<CardTitle>{props.title}</CardTitle>
				<CardDescription>{props.description}</CardDescription>
			</CardHeader>
			<CardContent>{props.children}</CardContent>
			<CardFooter>
				{ctx.current < ctx.nodes.size ? (
					<div className="flex w-full justify-between">
						<Button variant="outline" onClick={ctx.close}>
							Close
						</Button>
						<div>
							<Button onClick={ctx.previous}>Previous</Button>
							<Button onClick={ctx.next}>Next</Button>
						</div>
					</div>
				) : (
					<div className="flex w-full justify-end">
						<Button onClick={ctx.previous}>Previous</Button>
						<Button className="bg-green-800" onClick={ctx.close}>
							Finish
						</Button>
					</div>
				)}
			</CardFooter>
		</Card>
	);
}

export default function Usage() {
	const ctx = tour.useContext();
	return (
		<tour.TourProvider>
			<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
				<div className="absolute bottom-2 left-2 flex gap-2">
					<tour.TourFocus
						name="example1"
						tourRender={
							<TourDisplay title="Create Incident">
								<h1>This button creates an incident</h1>
								<p>helpful text about this button</p>
							</TourDisplay>
						}
					>
						<Button>Create Incident</Button>
					</tour.TourFocus>
					<tour.TourFocus
						name="example2"
						tourRender={
							<TourDisplay title="Update Incident">
								<h1>This button pushes your updates</h1>
								<p>helpful text about this button</p>
							</TourDisplay>
						}
					>
						<Button>Update Incident</Button>
					</tour.TourFocus>
				</div>

				<div>
					<tour.TourFocus
						name="emailInput"
						tourRender={
							<TourDisplay title="Email Input">
								<h1>This is where you put incident info</h1>
								<p>helpful text about this input</p>
							</TourDisplay>
						}
					>
						<Input type="email" placeholder="Email" />
					</tour.TourFocus>
				</div>
				<div className="absolute bottom-2 right-2">
					<Button onClick={ctx.open}>Open Tour</Button>
				</div>
			</div>
		</tour.TourProvider>
	);
}
