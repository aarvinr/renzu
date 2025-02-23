import type { HTML } from "./index.ts";

import type { Client } from "../client/index.ts";

/**
 * Returns the {@link HTML | HTML} string of a component.
 *
 * @param strings - The strings of the component.
 * @param clients - The {@link Client | client component}s of the component.
 * @returns The {@link HTML | HTML} string of the component.
 *
 * @example
 * Here's a simple example:
 * ```ts
 * // Returns the HTML string of `<main>Hello, world!</main>`:
 * return string(html`<main>Hello, world!</main>`);
 * ```
 *
 * @internal
 */
export default function string(
	strings: readonly string[],
	clients: readonly Client[],
): HTML {
	return {
		clients,
		string: strings[0]!,
	};
}
