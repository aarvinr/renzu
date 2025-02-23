import { PathLike } from "node:fs";

export default function (
	name: string,
	stack: string,
): {
	name: string;
	path: PathLike;
} {
	const lines = stack.split("\n");

	if (!lines || lines.length < 3) {
		throw new Error(`Could not find component \`${name}()\`'s path nor name.`);
	}

	const names = lines[2]!.match(/at (.*?) \(/);
	if (!names || names.length < 2) {
		throw new Error("Could not find component \`${name}()\`'s name.");
	}

	const paths = lines[2]!.match(/\((.*):\d+:\d+\)/);
	if (!paths || paths.length < 2) {
		throw new Error("Could not find component \`${name}()\`'s path.");
	}

	return {
		name: names[1]!,
		path: paths[1]!,
	};
}
