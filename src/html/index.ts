import client from "./client.ts";
import resolve from "./resolve.ts";
import string from "./string.ts";

import type { Client } from "../client/index.ts";

export type HTML = {
	clients?: readonly Client[];
	string: string;
};

export default function (
	strings: TemplateStringsArray,
	...values: readonly unknown[]
): HTML {
	return html(strings, values);
}

function html(
	strings: readonly string[],
	values: readonly unknown[],
	clients?: readonly Client[],
): HTML {
	if (strings.length === 1 && !clients) {
		return {
			string: strings[0]!,
		};
	}

	if (strings.length === 1) {
		return string(strings, clients!);
	}

	return resolve(
		client(values[0]),
		html(strings.slice(1), values.slice(1), clients),
		strings[0]!,
		values[0],
	);
}
