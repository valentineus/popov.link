import type { WithContext, Blog } from "schema-dts";

export type BlogSchemaParams = {
	readonly siteUrl: string;
	readonly title: string;
};

export default ({ siteUrl, title }: BlogSchemaParams): WithContext<Blog> => ({
	"@context": "https://schema.org",
	"@type": "Blog",
	"url": new URL("/blog/", siteUrl).toString(),
	"name": title,
});
