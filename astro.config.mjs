import { defineConfig } from "astro/config";
import { remarkReadingTime } from "./src/plugins/remarkReadingTime";
import cloudflare from "@astrojs/cloudflare";
import icon from "astro-icon";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://popov.link",
	output: "hybrid",
	adapter: cloudflare({
		imageService: "compile",
	}),
	integrations: [icon(), sitemap()],
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
