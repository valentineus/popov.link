import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
	const posts = await getCollection("blog", ({ data }) => {
		return data.draft !== true;
	});

	return rss({
		customData: `<language>ru-ru</language>`,
		description: import.meta.env.DEFAULT_DESCRIPTION,
		items: posts.map((post) => ({
			customData: post.data.customData,
			description: post.data.description,
			link: `/blog/${post.slug}`,
			pubDate: post.data.pubDate,
			title: post.data.title,
		})),
		site: context.site,
		title: import.meta.env.DEFAULT_TITLE,
	});
}
