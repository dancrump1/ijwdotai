"use client";

import React from "react";

import BookTestimonial3D from "@/registry/open-source/book-testimonials";
import { testimonials } from "@/registry/utilities/example_data";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<BookTestimonial3D testimonials={testimonials} />
		</div>
	);
}
