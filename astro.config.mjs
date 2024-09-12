import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./src/plugins/remarkReadingTime";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://popov.link",
	integrations: [sitemap()],
	markdown: {
		remarkPlugins: [remarkReadingTime],
	},
	redirects: {
		"/blog": {
			destination: "/",
			status: 301,
		},
	},
});
