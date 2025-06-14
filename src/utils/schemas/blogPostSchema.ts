import type { WithContext, BlogPosting } from "schema-dts";

export type BlogPostSchemaParams = {
	readonly author: string;
	readonly dateModified: string;
	readonly datePublished: string;
	readonly description: string;
	readonly lang: string;
	readonly siteUrl: string;
	readonly slug: string;
	readonly title: string;
};

export default ({ siteUrl, slug, title, description, datePublished, dateModified, author, lang }: BlogPostSchemaParams): WithContext<BlogPosting> => ({
	"@context": "https://schema.org",
	"@type": "BlogPosting",
	"url": new URL(`/blog/${slug}`, siteUrl).toString(),
	"headline": title,
	"description": description,
	"datePublished": datePublished,
	"dateModified": dateModified,
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
