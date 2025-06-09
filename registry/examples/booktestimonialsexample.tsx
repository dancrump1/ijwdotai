"use client";

import React from "react";

import BookTestimonial3D from "../open-source/BookTestimonials";

export default function Example() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-black">
			<BookTestimonial3D testimonials={testimonials} />
		</div>
	);
}
