import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./src/plugins/remarkReadingTime";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://popov.link",
	output: "static",
	integrations: [sitemap()],
	build: {
		inlineStylesheets: "always",
	},
	markdown: {
		remarkPlugins: [remarkReadingTime],
		shikiConfig: {
			theme: "vitesse-dark",
		},
	},
});
