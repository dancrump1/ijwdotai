import React from "react";

import { draftMode } from "next/headers";

import Home from "@/components/layouts/home";
import cmsClient from "@/lib/cmsClient";
import { gql } from "graphql-request";

export const fake_workspotlight = [
	{
		id: "work1",
		title: "work 1",
		image: { url: "/itjustworks.jpg" },
		uri: "https://google.com",
	},
	{
		id: "work2",
		title: "work 2",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work3",
		title: "work 3",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work4",
		title: "work 4",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work5",
		title: "work 5",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work6",
		title: "work 6",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work7",
		title: "work 7",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work8",
		title: "work 8",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work9",
		title: "work 9",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
	{
		id: "work10",
		title: "work 10",
		image: { url: "/itjustworks.jpg" },

		uri: "https://google.com",
	},
];

export const exampleImages = [
	{
		url: "/itjustworks.jpg",
		author: "Branislav Rodman",
		title: "A Black and White Photo of a Woman Brushing Her Teeth",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-painting-of-a-palm-leaf-on-a-multicolored-background-AaNPwrSNOFE",
		title: "Neon Palm",
		author: "Tim Mossholder",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-blurry-photo-of-a-crowd-of-people-UgbxzloNGsc",
		author: "ANDRII SOLOK",
		title: "A blurry photo of a crowd of people",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/rippling-crystal-blue-water-9-OCsKoyQlk",
		author: "Wesley Tingey",
		title: "Rippling Crystal Blue Water",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/de/fotos/mann-im-schwarzen-hemd-unter-blauem-himmel-m8RDNiuEXro",
		author: "Serhii Tyaglovsky",
		title: "Mann im schwarzen Hemd unter blauem Himmel",
	},
	{
		url: "/itjustworks.jpg",
		link: "https://unsplash.com/photos/a-woman-with-a-flower-crown-on-her-head-0S3muIttbsY",
		author: "Vladimir Yelizarov",
		title: "A women with a flower crown on her head",
	},
	{
		url: "/itjustworks.jpg",
		title: "A blurry photo of white flowers in a field",
		author: "Eugene Golovesov",
		link: "https://unsplash.com/photos/a-blurry-photo-of-white-flowers-in-a-field-6qbx0lzGPyc",
	},
	{
		url: "/itjustworks.jpg",
		author: "Mathilde Langevin",
		link: "https://unsplash.com/photos/a-table-topped-with-two-wine-glasses-and-plates-Ig0gRAHspV0",
		title: "A table topped with two wine glasses and plates",
	},
];

async function Page({ params }) {
	console.log(await params);
	const client = cmsClient(params.isEnabled, params?.token);
	const data = await client.request(gql`
		{
			peopleEntries {
				... on people_people_Entry {
					firstName
					lastName
					jobTitle
					image {
						img
						focalPoint
						extension
						url
						... on images_Asset {
							image {
								url
							}
						}
					}
					email
					description
				}
			}
		}
	`);

	return <Home data={data} />;
}

export default Page;
