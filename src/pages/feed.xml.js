import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
	const posts = await getCollection("blog");

	return rss({
		customData: `<language>ru-ru</language>`,
		description: "Tech insights and coding best practices from an OpenSource enthusiast and ethical hacker.",
		items: posts.map((post) => ({
			customData: post.data.customData,
			description: post.data.description,
			link: `/blog/${post.slug}`,
			pubDate: post.data.pubDate,
			title: post.data.title,
		})),
		site: context.site,
		title: "Valentin Popov’s Technology Blog",
	});
}
