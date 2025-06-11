import type { WithContext, BlogPosting } from "schema-dts";

export type BlogPostSchemaParams = {
	readonly siteUrl: string;
	readonly title: string;
	readonly slug: string;
	readonly datePublished: string;
	readonly author: string;
};

export default ({ siteUrl, title, slug, datePublished, author }: BlogPostSchemaParams): WithContext<BlogPosting> => ({
	"@context": "https://schema.org",
	"@type": "BlogPosting",
	"url": new URL(`/blog/${slug}`, siteUrl).toString(),
	"headline": title,
	"datePublished": datePublished,
	"author": {
		"@type": "Person",
		"name": author,
	},
});
