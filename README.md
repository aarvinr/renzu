# renzu

The bundler-less interface library for TypeScript.

```sh
pnpm add renzu
```

```ts
function Foo() {
	return html`<main>${client(Bar, "baz")}</main>`;
}

function Bar(qaz: string) {
	if (typeof window === "undefined") {
		throw new ClientOnlyError();
	}

	return html`<p>${window.prompt(qaz)}</p>`;
}
```
