export default class extends Error {
	constructor(
		message: string = "Server components cannot be called on the client.",
		options?: ErrorOptions,
	) {
		super(message, options);
		Error.prototype.name = "ServerOnlyError";
	}
}
