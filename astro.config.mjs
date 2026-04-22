import { defineConfig } from "astro/config";
import { globbySync } from "globby";
import fs from "node:fs";
import matter from "gray-matter";
import path from "node:path";
import rehypeExternalLinks from "rehype-external-links";
import sitemap from "@astrojs/sitemap";

import { remarkReadingTime } from "./src/plugins/remarkReadingTime";
import ogImages from "./src/integrations/ogImages";
import rehypeLazyImages from "./src/plugins/rehypeLazyImages";

const blogDir = path.resolve("./src/content/blog");

const lastmodBySlug = Object.fromEntries(
	globbySync("*.md", { cwd: blogDir }).map((file) => {
		const slug = file.replace(/\.md$/, "");
		const { data } = matter(fs.readFileSync(path.join(blogDir, file), "utf8"));
		const date = data.dateModified ?? data.datePublished;
		return [slug, new Date(date).toISOString()];
	})
);

const buildLastmod = new Date().toISOString();

export default defineConfig({
	site: "https://popov.link",
	output: "static",
	integrations: [
		sitemap({
			serialize(item) {
				const url = new URL(item.url);
				const match = url.pathname.match(/^\/blog\/([^/]+)\/?$/);

				if (match && lastmodBySlug[match[1]]) {
					item.lastmod = lastmodBySlug[match[1]];
				} else {
					item.lastmod = buildLastmod;
				}

				return item;
			},
		}),
		ogImages(),
	],
	build: {
		inlineStylesheets: "always",
	},
	markdown: {
		remarkPlugins: [remarkReadingTime],
		rehypePlugins: [[rehypeExternalLinks, { target: "_blank", rel: ["noopener", "noreferrer"] }], rehypeLazyImages],
		shikiConfig: {
			theme: "vitesse-dark",
		},
	},
});
