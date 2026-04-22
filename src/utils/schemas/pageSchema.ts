import type { ProfilePage, WebPage } from "schema-dts";
import { personId, websiteId } from "./ids";

export type WebsiteSchemaParams = {
	readonly description: string;
	readonly lang: string;
	readonly page: string;
	readonly siteUrl: string;
	readonly title: string;
	readonly type?: "WebPage" | "ProfilePage";
};

export default ({ siteUrl, page, title, description, lang, type = "WebPage" }: WebsiteSchemaParams): WebPage | ProfilePage => {
	const url = new URL(page, siteUrl).toString();

	const base = {
		"@type": type,
		"@id": url,
		"url": url,
		"name": title,
		"description": description,
		"inLanguage": lang,
		"isPartOf": { "@id": websiteId(siteUrl) },
	} as const;

	if (type === "ProfilePage") {
		return {
			...base,
			"@type": "ProfilePage",
			"mainEntity": { "@id": personId(siteUrl) },
		};
	}

	return base;
};
