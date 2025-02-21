# renzu

The bundler-less interface library for TypeScript.

```ts
function App() {
	return html`<main>${Hello("world")}</main>`;
}

function Hello(name: string) {
	return html`<p>Hello, ${name}!</p>`;
}
```
