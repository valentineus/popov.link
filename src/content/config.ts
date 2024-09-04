import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	type: "content",
	schema: z.object({
		author: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		title: z.string(),
	}),
});

export const collections = { blog };
