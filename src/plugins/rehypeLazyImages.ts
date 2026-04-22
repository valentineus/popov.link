import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

export default function rehypeLazyImages() {
	return (tree: Root): void => {
		visit(tree, "element", (node: Element) => {
			if (node.tagName !== "img") return;
			node.properties ??= {};
			node.properties.loading ??= "lazy";
			node.properties.decoding ??= "async";
		});
	};
}
