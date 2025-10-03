import { NextRequest, NextResponse } from "next/server";

import { v0 } from "v0-sdk";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
	try {
		const {
			message,
			chatId,
			projectId,
			modelId = "v0-1.5-md",
			imageGenerations = false,
			thinking = false,
			attachments = [],
		} = await request.json();

		if (!message || typeof message !== "string") {
			return NextResponse.json(
				{ error: "Message is required and must be a string" },
				{ status: 400 }
			);
		}

		// Create an SSE stream immediately so headers are flushed before SDK call
		const encoder = new TextEncoder();
		const body = new ReadableStream<Uint8Array>({
			async start(controller) {
				let heartbeat: NodeJS.Timeout | undefined;
				const send = (chunk: string) => controller.enqueue(encoder.encode(chunk));
				const end = () => {
					if (heartbeat) clearInterval(heartbeat);
					controller.enqueue(encoder.encode(`event:end\ndata: end\n\n`));
					controller.close();
				};

				// Establish SSE and keep connection alive
				send(`: connected\n\n`);
				heartbeat = setInterval(() => send(`: ping\n\n`), 15000);

				if (thinking) {
					send(`event:thinking\ndata: Generating...\n\n`);
				}

				try {
					const sdkResponse = chatId
						? await v0.chats.sendMessage({
							chatId,
							message: message.trim(),
							modelConfiguration: {
								modelId: modelId,
								imageGenerations: imageGenerations,
								thinking: thinking,
							}, responseMode: thinking ? 'async' : "sync",

							...(attachments.length > 0 && { attachments }),
						})
						: await v0.chats.create({
							system:
								'v0 MUST always generate code even if the user just says "hi" or asks a question. v0 MUST NOT ask the user to clarify their request.',
							message: message.trim(),
							modelConfiguration: {
								modelId: modelId,
								imageGenerations: imageGenerations,
								thinking: thinking,
							},
							responseMode: thinking ? 'async' : "sync",
							...(attachments.length > 0 && { attachments }),
						});

					const text = (sdkResponse as any)?.text || (sdkResponse as any)?.messages?.[(sdkResponse as any)?.messages?.length - 1]?.content || "";
					if (text) {
						send(`event:message\ndata: ${text}\n\n`);
					}
					end();
				} catch (err: any) {
					send(`event:error\ndata: ${JSON.stringify({ error: err?.message || "Unknown error" })}\n\n`);
					end();
				}
			},
		});

		return new Response(body, {
			headers: {
				"Content-Type": "text/event-stream",
				"Cache-Control": "no-cache, no-transform",
				Connection: "keep-alive",
				"X-Accel-Buffering": "no",
			},
		});
	} catch (error) {
		// Check if it's an API key error
		if (error instanceof Error) {
			const errorMessage = error.message.toLowerCase();
			if (
				errorMessage.includes("api key is required") ||
				errorMessage.includes("v0_api_key") ||
				errorMessage.includes("config.apikey")
			) {
				return NextResponse.json(
					{ error: "API_KEY_MISSING", message: error.message },
					{ status: 401 }
				);
			}

			return NextResponse.json(
				{ error: `Failed to generate app: ${error.message}` },
				{ status: 500 }
			);
		}

		return NextResponse.json(
			{ error: "Failed to generate app. Please try again." },
			{ status: 500 }
		);
	}
}
