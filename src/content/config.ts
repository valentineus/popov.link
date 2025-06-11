import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	type: "content",
	schema: z.object({
		author: z.string(),
		description: z.string(),
		draft: z.optional(z.boolean()),
		pubDate: z.coerce.date(),
		title: z.string(),
		lang: z.string(),
	}),
});

export const collections = { blog };
