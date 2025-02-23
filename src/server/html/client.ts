import type { Client } from "@/server/client/index.ts";

export default function (value: unknown): Client | void {
	if (
		typeof value === "object" &&
		value!.hasOwnProperty("identifier") &&
		value!.hasOwnProperty("name") &&
		value!.hasOwnProperty("parameters") &&
		value!.hasOwnProperty("path")
	) {
		return value as Client;
	}
}
