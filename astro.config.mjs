import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./src/plugins/remarkReadingTime";
import ogImages from "./src/integrations/ogImages";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://popov.link",
	output: "static",
	integrations: [sitemap(), ogImages()],
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
