import type { CollectionPage } from "schema-dts";
import type { CollectionEntry } from "astro:content";
import { websiteId } from "./ids";

export type BlogSchemaParams = {
	readonly description: string;
	readonly lang: string;
	readonly posts: CollectionEntry<"blog">[];
	readonly siteUrl: string;
	readonly title: string;
};

export default ({ siteUrl, title, description, lang, posts }: BlogSchemaParams): CollectionPage => {
	const url = new URL("/blog/", siteUrl).toString();

	return {
		"@type": "CollectionPage",
		"@id": url,
		"url": url,
		"name": title,
		"description": description,
		"inLanguage": lang,
		"isPartOf": { "@id": websiteId(siteUrl) },
		"mainEntity": {
			"@type": "ItemList",
			"itemListOrder": "https://schema.org/ItemListOrderDescending",
			"numberOfItems": posts.length,
			"itemListElement": posts.map((post, index) => ({
				"@type": "ListItem",
				"position": index + 1,
				"url": new URL(`/blog/${post.id}`, siteUrl).toString(),
				"name": post.data.title,
			})),
		},
	};
};
