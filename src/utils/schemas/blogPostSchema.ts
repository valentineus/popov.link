import type { WithContext, BlogPosting } from "schema-dts";

export type BlogPostSchemaParams = {
	readonly siteUrl: string;
	readonly title: string;
	readonly description: string;
	readonly slug: string;
	readonly datePublished: string;
	readonly author: string;
	readonly lang: string;
};

export default ({ siteUrl, title, description, slug, datePublished, author, lang }: BlogPostSchemaParams): WithContext<BlogPosting> => ({
	"@context": "https://schema.org",
	"@type": "BlogPosting",
	"url": new URL(`/blog/${slug}`, siteUrl).toString(),
	"headline": title,
	"description": description,
	"datePublished": datePublished,
	"dateModified": datePublished,
	"inLanguage": lang,
	"author": {
		"@type": "Person",
		"name": author,
	},
	"mainEntityOfPage": {
		"@type": "WebPage",
		"@id": new URL(`/blog/${slug}`, siteUrl).toString(),
	},
});
