/**
 * Returns a string with interpolated values of HTML.
 *
 * @param strings - Template strings.
 * @param values - Interpolated values.
 * @returns A string with interpolated values of HTML.
 *
 * @example
 * Here's a simple example:
 * ```ts
 * // Returns `"Hello, world!"`:
 * html`Hello, world!`;
 * ```
 * @example
 * Here's an example with interpolated values:
 * ```ts
 * // Returns `"Hello, Sam!"`:
 * const name = "Sam";
 * html`Hello, ${name}!`;
 * ```
 *
 * @public
 */
export default function html(
	strings: TemplateStringsArray,
	...values: unknown[]
) {
	function interpolate(raw: readonly string[], values: unknown[]): string {
		if (!raw[0]) return "";
		if (raw.length === 1) return raw[0];

		const value = values.length ? values[0] : "";
		return raw[0] + value + interpolate(raw.slice(1), values.slice(1));
	}

	return interpolate(strings.raw, values);
}
