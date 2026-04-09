import { getCollection } from "astro:content";
import rss from "@astrojs/rss";

export async function GET(context) {
	const title = "RSS Feed | Valentin Popov Blog";
	const description = "Follow the latest posts from Valentin Popov via RSS.";

	const posts = await getCollection("blog", ({ data }) => {
		return data.draft !== true;
	});

	return rss({
		customData: `<language>en</language>`,
		description: description,
		items: posts.map((post) => ({
			description: post.data.description,
			link: `/blog/${post.id}`,
			pubDate: post.data.datePublished,
			title: post.data.title,
		})),
		site: context.site,
		title: title,
	});
}
