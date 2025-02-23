/**
 * The bundler-less interface library for TypeScript.
 *
 * @example
 * Here's a simple example:
 * ```ts
 * function Foo() {
 * 	return html`<main>${client(Bar, "baz")}</main>`;
 * }
 *
 * function Bar(qaz: string) {
 * 	if (typeof window === "undefined") {
 * 		throw new ClientOnlyError();
 * 	}
 *
 * 	return html`<p>${window.prompt(qaz)}</p>`;
 * }
 * ```
 *
 * @packageDocumentation
 */

export type { Client } from "./client/index.ts";
export type { HTML } from "./html/index.ts";

export { default as ClientOnlyError } from "./error.ts";

export { default as client } from "./client/index.ts";
export { default as html } from "./html/index.ts";
