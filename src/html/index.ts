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
	 * The strings of the {@link HTML | HTML}.
	 */
	strings: readonly string[];
};

/**
 * Returns the {@link HTML | HTML} of a component.
 *
 * @param strings - The strings of the component.
 * @param values - The values of the component.
 * @returns The {@link HTML | HTML} of the component.
 *
 * @example
 * Here's a simple example:
 * ```ts
 * // Returns the HTML of `<p>Hello, world!</p>`:
 * return html`<p>Hello, world!</p>`;
 * ```
 * @example
 * Here's an example with parameters:
 * ```ts
 * // Returns the HTML of ```<p>Hello, ${name}!</p>```:
 * return html`<p>Hello, ${name}!</p>`;
 * ```
 *
 * @public
 */
export default function (
	strings: TemplateStringsArray,
	...values: unknown[]
): HTML {
	return html(Array.from(strings), values.slice());
}

/**
 * Returns the {@link HTML | HTML} of a component.
 *
 * @param strings - The strings of the component.
 * @param values - The values of the component.
 * @returns The {@link HTML | HTML} of the component.
 *
 * @example
 * Here's a simple example:
 * ```ts
 * // Returns the HTML of `<p>Hello, world!</p>`:
 * return html(["<p>Hello, world!</p>"]);
 * ```
 * @example
 * Here's an example with parameters:
 * ```ts
 * // Returns the HTML of ```<p>Hello, ${name}!</p>```:
 * return html(["<p>Hello, ", "!</p>"], [name]);
 * ```
 *
 * @internal
 */
function html(strings: readonly string[], values: readonly unknown[]): HTML {
	const string = strings[0]!;

	if (values.length === 0) {
		return { strings };
	}
	const value = values[0]!;

	const slice = html(strings.slice(1), values.slice(1));
	if (
		typeof value === "object" &&
		"identifier" in value &&
		"name" in value &&
		"parameters" in value &&
		"path" in value
	) {
		return {
			clients: [value as Client, ...(slice.clients ?? [])],
			strings: [string, ...slice.strings],
		};
	}

	if (slice.clients === undefined) {
		return {
			strings: [
				string + (value ?? "") + slice.strings[0],
				...slice.strings.slice(1),
			],
		};
	}

	return {
		clients: slice.clients,
		strings: [
			string + (value ?? "") + slice.strings[0],
			...slice.strings.slice(1),
		],
	};
}
