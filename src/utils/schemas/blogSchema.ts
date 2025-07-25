import type { WithContext, CollectionPage } from "schema-dts";
import type { CollectionEntry } from "astro:content";

export type BlogSchemaParams = {
	readonly posts: CollectionEntry<"blog">[];
	readonly siteUrl: string;
	readonly title: string;
};

export default ({ siteUrl, title, posts }: BlogSchemaParams): WithContext<CollectionPage> => ({
	"@context": "https://schema.org",
	"@type": "CollectionPage",
	"url": new URL("/blog/", siteUrl).toString(),
	"name": title,
	"mainEntity": {
		"@type": "ItemList",
		"itemListOrder": "https://schema.org/ItemListOrderDescending",
		"numberOfItems": posts.length,
		"itemListElement": posts.map((post, index) => ({
			"@type": "ListItem",
			"position": index + 1,
			"url": new URL(`/blog/${post.slug}`, siteUrl).toString(),
			"name": post.data.title,
		})),
	},
});
