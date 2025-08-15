"use server";

import React from "react";

import { cookies, draftMode } from "next/headers";

import Home from "@/components/layouts/home";
import cmsClient from "@/lib/cmsClient";
import { gql } from "graphql-request";

async function getData() {
	const { isEnabled } = await draftMode();
	const cookieStore = await cookies();
	const entryUid = cookieStore.get("entryUid");
	const token = cookieStore.get("token");

	const client = cmsClient(isEnabled, token?.value);

	const data = await client.request(
		gql`
			query ($uid: [String]) {
				entry(uid: $uid) {
					... on home_Entry {
						displayEvents(orderBy: "startDate") {
							... on events_Event {
								eventCategory
								startDate
								endDate
								startDateLocalized
								endDateLocalized
								allDay
								multiDay
								freq
								interval
								title
								subhead
								copy
								venue
								url
							}
						}

						headline
						salesCards {
							... on priceCard_Entry {
								title
								enabled

								price
								comment
								copy
								disclaimer

								priceTable {
									title
									online
									window
								}
							}
						}
					}
				}
			}
		`,
		{ uid: entryUid }
	);

	return data;
}

async function Page() {
	const data = await getData();

	return <Home data={data} />;
}

export default Page;
