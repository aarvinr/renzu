import type { Client } from "../client/index.ts";

/**
 * Returns if is a {@link Client}.
 *
 * @param value - The value to check.
 * @returns If is a {@link Client}.
 *
 * @internal
 */
export default function (value: unknown): value is Client {
	return (
		typeof value === "object" &&
		value !== null &&
		"identifier" in value &&
		"name" in value &&
		"parameters" in value &&
		"path" in value
	);
}
