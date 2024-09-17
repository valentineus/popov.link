import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./src/plugins/remarkReadingTime";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://popov.link",
	output: "hybrid",
	adapter: cloudflare(),
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
