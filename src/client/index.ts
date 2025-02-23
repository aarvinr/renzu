import path from "./path.ts";

import ClientOnlyError from "../error.ts";

import type { PathLike } from "node:fs";
import { randomBytes } from "node:crypto";

/**
 * A {@link Client | client component}.
 * @public
 */
export type Client = {
	/**
	 * The identifier of the {@link Client | client component}.
	 */
	identifier: string;

	/**
	 * The name of the {@link Client | client component}.
	 */
	name: string;

	/**
	 * The parameters of the {@link Client | client component}.
	 */
	parameters: unknown[];

	/**
	 * The path of the {@link Client | client component}
	 */
	path: PathLike;
};

/**
 * Returns the {@link Client | client component} of a component.
 *
 * @remarks
 * The component should throw a {@link ClientOnlyError} if it is called on the server.
 *
 * @param component - The component.
 * @param parameters - The parameters of the component.
 * @returns The {@link Client | client component}.
 *
 * @example
 * Here's a simple example:
 * ```ts
 * // Returns the client component of `Bar()`:
 * function Foo() {
 * 	return html`<main>${client(Bar)}</main>`;
 * }
 * ```
 * @example
 * Here's an example with parameters:
 * ```ts
 * // Returns the client component of `Bar("baz")`:
 * function Foo() {
 * 	return html`<main>${client(Bar, "baz")}</main>`;
 * }
 * ```
 *
 * @public
 */
export default function (
	component: (...parameters: unknown[]) => void,
	...parameters: unknown[]
): Client {
	try {
		component(...parameters);
	} catch (error) {
		if (!(error instanceof Error) || error.name !== ClientOnlyError.name) {
			throw error;
		}

		const name = component.name;
		if (!error.stack) {
			throw new Error(`Could not find client component \`${name}()\`.`);
		}

		const identifier = randomBytes(16).toString("hex");
		return {
			identifier,
			name,
			parameters: parameters,
			path: path(name, error.stack),
		};
	}

	throw new Error(`Could not find client component \`${component.name}()\`.`);
}
