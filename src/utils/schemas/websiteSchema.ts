import type { WebSite } from "schema-dts";
import { config } from "../../config";
import { personId, websiteId } from "./ids";

export type WebsiteSchemaParams = {
	readonly description: string;
	readonly lang: string;
	readonly name: string;
	readonly siteUrl: string;
};

export default ({ siteUrl, name, description, lang }: WebsiteSchemaParams): WebSite => ({
	"@type": "WebSite",
	"@id": websiteId(siteUrl),
	"url": siteUrl,
	"name": name,
	"description": description,
	"inLanguage": lang,
	"publisher": { "@id": personId(siteUrl) },
	"author": { "@id": personId(siteUrl) },
	"copyrightHolder": { "@id": personId(siteUrl) },
	"sameAs": config.author.sameAs,
});
