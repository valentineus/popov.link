import type { BlogPosting } from "schema-dts";
import { personId, websiteId } from "./ids";

export type BlogPostSchemaParams = {
	readonly dateModified: string;
	readonly datePublished: string;
	readonly description: string;
	readonly isBasedOn?: string;
	readonly lang: string;
	readonly preview: string;
	readonly siteUrl: string;
	readonly slug: string;
	readonly title: string;
};

export default ({ siteUrl, slug, title, description, preview, datePublished, dateModified, lang, isBasedOn }: BlogPostSchemaParams): BlogPosting => {
	const url = new URL(`/blog/${slug}`, siteUrl).toString();

	return {
		"@type": "BlogPosting",
		"@id": url,
		"url": url,
		"headline": title,
		"description": description,
		"image": new URL(preview, siteUrl).toString(),
		"datePublished": datePublished,
		"dateModified": dateModified,
		"inLanguage": lang,
		"author": { "@id": personId(siteUrl) },
		"publisher": { "@id": personId(siteUrl) },
		"isPartOf": { "@id": websiteId(siteUrl) },
		"mainEntityOfPage": {
			"@type": "WebPage",
			"@id": url,
		},
		...(isBasedOn && { isBasedOn: isBasedOn }),
	};
};
