"use client";

import React from "react";

import Testimonials from "@/components/GradientTestimonials";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<Testimonials
				data={[
					{
						title: "testimonial 1",
						comment: "etst",
					},
					{
						title: "testimonial 1",
						comment: "etst",
					},
					{
						title: "testimonial 1",
						comment: "etst",
					},
				]}
			/>
		</div>
	);
}
