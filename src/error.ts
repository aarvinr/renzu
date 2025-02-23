export default class extends Error {
	constructor(
		message: string = "Client components cannot be called on the server.",
		options?: ErrorOptions,
	) {
		super(message, options);
		Error.prototype.name = "ClientOnlyError";
	}
}
