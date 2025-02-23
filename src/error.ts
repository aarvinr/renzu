/**
 * The error thrown when a client component is called on the server.
 *
 * @example
 * Here's a simple example:
 * ```ts
 * // Throws a `ClientOnlyError`:
 * if (typeof window === "undefined") {
 * 	throw new ClientOnlyError();
 * }
 * ```
 *
 * @public
 */
export default class extends Error {
	/**
	 * Creates a new instance of the {@link ClientOnlyError | ClientOnlyError} class.
	 *
	 * @param message - The message of the error.
	 * @param options - The options of the error.
	 *
	 * @example
	 * Here's a simple example:
	 * ```ts
	 * // Throws a `ClientOnlyError`:
	 * throw new ClientOnlyError();
	 * ```
	 */
	constructor(
		message: string = "Client components cannot be called on the server.",
		options?: ErrorOptions,
	) {
		super(message, options);
		Error.prototype.name = "ClientOnlyError";
	}
}
