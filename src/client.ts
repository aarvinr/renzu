import { randomBytes } from "node:crypto";
import { PathLike } from "node:fs";

import { serialize } from "superjson";

/**
 * Marks a client component or returns a string of a client component.
 *
 * @param component - Component to mark as a client component.
 * @param parameters - Parameters to pass to the component.
 * @returns A client component.
 *
 * @example
 * Here's a simple example:
 * ```ts
 * // Marks `foo()` a client component:
 * function foo() {
 *  client();
 * }
 * ```
 * @example
 * Here's an example with a client component:
 * ```ts
 * // Returns a string of `bar()`:
 * function foo() {
 *  return client(bar);
 * }
 * ```
 * @example
 * Here's an example with a client component and parameters:
 * ```ts
 * // Returns a string of `bar()`:
 * function foo() {
 *  return client(bar, "baz");
 * }
 * ```
 *
 * @public
 */
export default function client(
	component?: (...args: unknown[]) => void,
	...parameters: unknown[]
) {
	const message = "Client components must be returned with `client()`.";
	if (!component) {
		if (typeof window !== "undefined") {
			return;
		}

		throw new Error(message);
	}

	try {
		component(...parameters);
	} catch (error) {
		if (!(error instanceof Error)) {
			throw error;
		}

		if (error.message !== message) {
			throw error;
		}

		if (!error.stack) {
			throw new Error("Could not find component.");
		}
		const { path, name } = stack(error.stack);

		const identifier = randomBytes(16).toString("hex");
		const { json, meta } = serialize(parameters);

		if (!meta) {
			return `<!-- renzu:${identifier}:${path}:${name}:${JSON.stringify(json)} -->`;
		}

		return `<!-- renzu:${identifier}:${path}:${name}:${JSON.stringify(json)}:${JSON.stringify(meta)} -->`;
	}

	throw new Error("Client components must be marked with `client()`.");
}

function stack(stack: string): {
	path: PathLike;
	name: string;
} {
	const lines = stack.split("\n");

	if (!lines || lines.length < 3) {
		throw new Error("Could not find component path nor name.");
	}

	const paths = lines[2]!.match(/\((.*):\d+:\d+\)/);
	if (!paths || paths.length < 2) {
		throw new Error("Could not find component path.");
	}

	const names = lines[2]!.match(/at (.*?) \(/);
	if (!names || names.length < 2) {
		throw new Error("Could not find component name.");
	}

	if (paths.length < 2) {
		throw new Error("Could not find component path.");
	}

	if (names.length < 2) {
		throw new Error("Could not find component name.");
	}

	return {
		path: paths[1]!,
		name: names[1]!,
	};
}
