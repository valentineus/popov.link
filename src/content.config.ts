import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
	loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
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
