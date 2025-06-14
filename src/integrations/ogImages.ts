import type { AstroIntegration } from "astro";
import { createOgImage } from "../utils/createOgImage";
import { globby } from "globby";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

const postsDir = path.resolve("./src/content/blog");
const outDir = path.resolve("./public/images/preview");

export default function ogImageGenerator(): AstroIntegration {
	return {
		name: "og-images",
		hooks: {
			"astro:build:setup": async ({ logger }) => {
				await fs.mkdir(outDir, { recursive: true });
				const mdFiles = await globby("*.md", { cwd: postsDir });
				logger.info(`${mdFiles.length} posts found`);

				const results = await Promise.allSettled(
					mdFiles.map(async (file) => {
						const slug = file.replace(/\.md$/, "");
						const content = await fs.readFile(path.join(postsDir, file), "utf-8");
						const { data } = matter(content);

						const png = await createOgImage(data.title, data.datePublished);
						const outPath = path.join(outDir, `${slug}.png`);
						await fs.writeFile(outPath, png);

						logger.info(`OG image created: ${slug}`);
					})
				);

				results.forEach((r) => {
					if (r.status === "rejected") {
						logger.error(`Error for ${r.reason.slug}: ${r.reason.message}`);
					}
				});

				const failures = results.filter((r) => r.status === "rejected");
				if (failures.length) {
					throw new Error(`Failed to generate OG images for ${failures.length} posts`);
				}
			},
		},
	};
}
