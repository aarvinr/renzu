import type { HTML } from "./index.ts";

/**
 * Returns merge of some {@link HTML | HTML}.
 *
 * @param html - The {@link HTML | HTML} to merge.
 * @param slice - The slice to merge.
 * @param string - The string to merge.
 * @returns The merge of the {@link HTML | HTML}.
 *
 * @internal
 */
export default function (html: HTML, slice: HTML, string: string): HTML {
	if (html.strings.length === 1) {
		if (slice.clients === undefined) {
			return {
				strings: [
					string + html.strings.at(0) + slice.strings.at(0),
					...slice.strings.slice(1),
				],
			};
		}

		return {
			clients: slice.clients,
			strings: [
				string + html.strings.at(0) + slice.strings.at(0),
				...slice.strings.slice(1),
			],
		};
	}

	return {
		clients: [...(html.clients || []), ...(slice.clients || [])],
		strings: [
			string + html.strings.at(0),
			...html.strings.slice(1, -1),
			html.strings.at(-1)! + slice.strings.at(0),
			...slice.strings.slice(1),
		],
	};
}
