import type { BreadcrumbList } from "schema-dts";

export type BreadcrumbItem = {
	readonly name: string;
	readonly url: string;
};

export type BreadcrumbSchemaParams = {
	readonly items: BreadcrumbItem[];
	readonly siteUrl: string;
};

export default ({ items, siteUrl }: BreadcrumbSchemaParams): BreadcrumbList => ({
	"@type": "BreadcrumbList",
	"itemListElement": items.map((item, index) => ({
		"@type": "ListItem",
		"position": index + 1,
		"name": item.name,
		"item": new URL(item.url, siteUrl).toString(),
	})),
});
