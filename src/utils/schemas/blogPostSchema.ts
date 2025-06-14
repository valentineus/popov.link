import type { WithContext, BlogPosting } from "schema-dts";
import { config } from "../../config";

export type BlogPostSchemaParams = {
	readonly dateModified: string;
	readonly datePublished: string;
	readonly description: string;
	readonly isBasedOn?: string;
	readonly lang: string;
	readonly preview?: string;
	readonly siteUrl: string;
	readonly slug: string;
	readonly title: string;
};

export default ({ siteUrl, slug, title, description, preview, datePublished, dateModified, lang, isBasedOn }: BlogPostSchemaParams): WithContext<BlogPosting> => ({
	"@context": "https://schema.org",
	"@type": "BlogPosting",
	"url": new URL(`/blog/${slug}`, siteUrl).toString(),
	"headline": title,
	"description": description,
	"image": new URL(preview ? preview : config.posts.defaultImage, siteUrl).toString(),
	"datePublished": datePublished,
	"dateModified": dateModified,
	"inLanguage": lang,
	"author": {
		"@type": "Person",
		"name": config.author.name,
		"url": config.author.url,
		"sameAs": config.author.sameAs,
	},
	"mainEntityOfPage": {
		"@type": "WebPage",
		"@id": new URL(`/blog/${slug}`, siteUrl).toString(),
	},
	...(isBasedOn && { isBasedOn: isBasedOn }),
});
