import type { HTML } from "./index.ts";
import client from "./client.ts";

import type { Client } from "../client/index.ts";

/**
 * Resolves the {@link HTML | HTML} of a component.
 *
 * @param result - The {@link HTML | HTML} of the component.
 * @param string - The string of the component.
 * @param value - The value of the component.
 * @returns The {@link HTML | HTML} of the component.
 *
 * @example
 * Here's a simple example:
 * ```ts
 * // Resolves the HTML of `<main>Hello, world!</main>`:
 * return resolve(html`</main>`, "<main>", "Hello, world!");
 * ```
 *
 * @internal
 */
export default function (result: HTML, string: string, value: unknown): HTML {
	if (client(value)) {
		return {
			clients: [value as Client, ...(result.clients as Client[])],
			string: string + result.string,
		};
	}

	if (result.clients === undefined) {
		return {
			string: string + result.string,
		};
	}

	return {
		clients: result.clients,
		string: string + result.string,
	};
}
