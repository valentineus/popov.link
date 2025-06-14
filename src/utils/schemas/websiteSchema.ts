import type { WithContext, WebSite } from "schema-dts";

export type WebsiteSchemaParams = {
	readonly description: string;
	readonly siteUrl: string;
	readonly title: string;
};

export default ({ siteUrl, title, description }: WebsiteSchemaParams): WithContext<WebSite> => ({
	"@context": "https://schema.org",
	"@type": "WebSite",
	"url": new URL("/", siteUrl).toString(),
	"name": title,
	"description": description,
});
