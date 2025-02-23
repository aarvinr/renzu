import resolve from "./resolve.ts";
import string from "./string.ts";

import type { Client } from "../client/index.ts";

/**
 * {@link HTML | HTML}.
 * @public
 */
export type HTML = {
	/**
	 * The {@link Client | client component}s of the {@link HTML | HTML}.
	 */
	clients?: readonly Client[];

	/**
	 * The string of the {@link HTML | HTML}.
	 */
	string: string;
};

/**
 * Returns the {@link HTML | HTML} of a component.
 *
 * @remarks
 * The strings and values should be passed as a tagged template literal.
 *
 * @param strings - The strings of the component.
 * @param values - The values of the component.
 * @returns The {@link HTML | HTML} of the component.
 *
 * @example
 * Here's a simple example:
 * ```ts
 * // Returns the HTML of `<main>Hello, world!</main>`:
 * function Foo() {
 * 	return html`<main>Hello, world!</main>`;
 * }
 * ```
 * @example
 * Here's an example with parameters:
 * ```ts
 * // Returns the HTML of `<main>Hello, ${name}!</main>`:
 * function Foo(name: string) {
 * 	return html`<main>Hello, ${name}!</main>`;
 * }
 * ```
 *
 * @public
 */
export default function (
	strings: TemplateStringsArray,
	...values: readonly unknown[]
): HTML {
	return html(strings, values);
}

/**
 * Returns the {@link HTML | HTML} of a component.
 *
 * @param strings - The strings of the component.
 * @param values - The values of the component.
 * @param clients - The {@link Client | client component}s of the component.
 * @returns The {@link HTML | HTML} of the component.
 *
 * @example
 * Here's a simple example:
 * ```ts
 * // Returns the HTML of `<main>Hello, world!</main>`:
 * function Foo() {
 * 	return html(html`<main>Hello, world!</main>`);
 * }
 * ```
 *
 * @internal
 */
function html(
	strings: readonly string[],
	values: readonly unknown[],
	clients?: readonly Client[],
): HTML {
	if (strings.length === 1 && clients === undefined) {
		return {
			string: strings[0]!,
		};
	}

	if (strings.length === 1) {
		return string(strings, clients!);
	}

	return resolve(
		html(strings.slice(1), values.slice(1), clients),
		strings[0]!,
		values[0],
	);
}
