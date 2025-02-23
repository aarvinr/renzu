import type { HTML } from "./index.ts";

import type { Client } from "../client/index.ts";

export default function (
	client: Client,
	result: HTML,
	string: string,
	value: unknown,
): HTML {
	if (!client) {
		if (!result.clients) {
			return {
				string: string + result.string,
			};
		}

		return {
			clients: [value as Client, ...(result.clients as Client[])],
			string: string + result.string,
		};
	}

	return {
		clients: [client, ...(result.clients as Client[])],
		string: string + result.string,
	};
}
