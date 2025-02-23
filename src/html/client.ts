/**
 * Returns whether the unknown value is a {@link Client | client component}.
 *
 * @param value - The unknown value.
 * @returns Whether the unknown value is a {@link Client | client component}.
 *
 * @example
 * Here's a simple example:
 * ```ts
 * // Returns `true`:
 * client(client(Bar));
 *
 * function Bar() {
 * 	if (typeof window === "undefined") {
 * 		throw new ClientOnlyError();
 * 	}
 * }
 * ```
 *
 * @internal
 */
export default function (value: unknown): boolean {
	if (
		typeof value !== "object" ||
		!value!.hasOwnProperty("identifier") ||
		!value!.hasOwnProperty("name") ||
		!value!.hasOwnProperty("parameters") ||
		!value!.hasOwnProperty("path")
	) {
		return false;
	}

	return true;
}
