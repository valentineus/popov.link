import type { WithContext, CollectionPage } from "schema-dts";
import type { CollectionEntry } from "astro:content";

export type BlogSchemaParams = {
	readonly siteUrl: string;
	readonly title: string;
	readonly posts: CollectionEntry<"blog">[];
};

export default ({ siteUrl, title, posts }: BlogSchemaParams): WithContext<CollectionPage> => ({
	"@context": "https://schema.org",
	"@type": "CollectionPage",
	"url": new URL("/blog/", siteUrl).toString(),
	"name": title,
	"mainEntity": {
		"@type": "ItemList",
		"itemListElement": posts.map((post, index) => ({
			"@type": "ListItem",
			"position": index + 1,
			"url": new URL(`/blog/${post.slug}`, siteUrl).toString(),
			"name": post.data.title,
		})),
	},
});
