import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	type: "content",
	schema: z.object({
		basedOn: z.optional(z.string()),
		dateModified: z.coerce.date(),
		datePublished: z.coerce.date(),
		description: z.string(),
		draft: z.optional(z.boolean()),
		lang: z.string(),
		title: z.string(),
	}),
});

export const collections = { blog };
