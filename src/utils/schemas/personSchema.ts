import type { Person } from "schema-dts";
import { config } from "../../config";
import { personId } from "./ids";

export type PersonSchemaParams = {
	readonly siteUrl: string;
};

export default ({ siteUrl }: PersonSchemaParams): Person => ({
	"@type": "Person",
	"@id": personId(siteUrl),
	"name": config.author.name,
	"url": config.author.url,
	"email": config.author.email,
	"image": new URL(config.og.defaultPreview, siteUrl).toString(),
	"sameAs": config.author.sameAs,
});
