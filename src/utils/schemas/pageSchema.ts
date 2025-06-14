import type { WithContext, WebPage } from "schema-dts";

export type WebsiteSchemaParams = {
	readonly description: string;
	readonly page: string;
	readonly siteUrl: string;
	readonly title: string;
	readonly lang: string;
};

export default ({ siteUrl, page, title, description, lang }: WebsiteSchemaParams): WithContext<WebPage> => ({
	"@context": "https://schema.org",
	"@type": "WebPage",
	"@id": new URL(page, siteUrl).toString(),
	"url": new URL(page, siteUrl).toString(),
	"name": title,
	"description": description,
	"inLanguage": lang,
	"mainEntity": {
		"@type": "WebSite",
		"@id": new URL("/", siteUrl).toString(),
	},
});
