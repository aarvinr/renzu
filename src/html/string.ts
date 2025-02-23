import type { HTML } from "./index.ts";

import type { Client } from "../client/index.ts";

export default function string(
	strings: readonly string[],
	clients: readonly Client[],
): HTML {
	return {
		clients,
		string: strings[0]!,
	};
}
