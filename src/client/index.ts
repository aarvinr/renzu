import stack from "./stack.ts";

import type { PathLike } from "node:fs";
import { randomBytes } from "node:crypto";

import { type SuperJSONResult, serialize } from "superjson";

export type Client = {
	identifier: string;
	name: string;
	parameters: SuperJSONResult;
	path: PathLike;
} | void;

export default function (
	component: (...parameters: unknown[]) => void,
	...parameters: unknown[]
): Client {
	try {
		component(...parameters);
	} catch (error) {
		if (
			!(error instanceof Error) ||
			error.message !== "Client components cannot be called on the server."
		) {
			throw error;
		}

		if (!error.stack) {
			throw new Error(`Could not find client component ${component.name}.`);
		}

		const { name, path } = stack(component.name, error.stack);
		const identifier = randomBytes(16).toString("hex");
		return {
			identifier,
			name,
			parameters: serialize(parameters),
			path,
		};
	}
}
