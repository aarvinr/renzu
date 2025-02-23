import { PathLike } from "node:fs";

/**
 * Returns the {@link Client | client component}'s path from the stack of a {@link ClientOnlyError}.
 *
 * @param name - The name of the {@link Client | client component}.
 * @param stack - The stack of the {@link ClientOnlyError}.
 * @returns The {@link Client | client component}'s path.
 *
 * @example
 * Here's a simple example:
 * ```ts
 * // Returns the path from the stack of `Foo()`'s `ClientOnlyError`:
 * try {
 * 	Foo();
 * } catch (error) {
 * 	path(Foo.name, error.stack!);
 * }
 *
 * function Foo() {
 * 	if (typeof window === "undefined") {
 * 		throw new ClientOnlyError();
 * 	}
 * }
 * ```
 *
 * @internal
 */
export default function (name: string, stack: string): PathLike {
	return path(name, stack.split("\n"));
}

/**
 * Returns the {@link Client | client component}'s path from the lines of a {@link ClientOnlyError}'s stack.
 *
 * @param name - The name of the {@link Client | client component}.
 * @param stack - The lines of the {@link ClientOnlyError}'s stack.
 * @returns The {@link Client | client component}'s path.
 *
 * @example
 * Here's a simple example:
 * ```ts
 * // Returns the path from the lines of `Foo()`'s `ClientOnlyError`'s stack:
 * try {
 * 	Foo();
 * } catch (error) {
 * 	path(Foo.name, error.stack!.split("\n"));
 * }
 *
 * function Foo() {
 * 	if (typeof window === "undefined") {
 * 		throw new ClientOnlyError();
 * 	}
 * }
 * ```
 *
 * @internal
 */
function path(name: string, lines: string[]): PathLike {
	if (lines.length === 0) {
		throw new Error(`Could not find component \`${name}()\`'s path.`);
	}

	const match = lines[0]!.match(
		new RegExp(`\\b${name}\\b\\s*\\((.*?):\\d+:\\d+\\)`),
	);
	if (match === null || match.length < 2) {
		return path(name, lines.slice(1));
	}

	return match[1]!;
}
