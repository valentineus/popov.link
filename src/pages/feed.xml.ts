import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import MarkdownIt from "markdown-it";
import rss from "@astrojs/rss";
import sanitizeHtml from "sanitize-html";
import { config } from "../config";

const parser = new MarkdownIt({ html: false, linkify: true });

export async function GET(context: APIContext) {
	const title = "RSS Feed | Valentin Popov Blog";
	const description = "Follow the latest posts from Valentin Popov via RSS.";

	const posts = (await getCollection("blog", ({ data }) => data.draft !== true)).sort((a, b) => b.data.datePublished.getTime() - a.data.datePublished.getTime());

	const feedUrl = new URL("/feed.xml", context.site).toString();

	return rss({
		title,
		description,
		site: context.site ?? config.author.url,
		xmlns: {
			atom: "http://www.w3.org/2005/Atom",
			content: "http://purl.org/rss/1.0/modules/content/",
			dc: "http://purl.org/dc/elements/1.1/",
		},
		customData: `<atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>`,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			link: `/blog/${post.id}/`,
			pubDate: post.data.datePublished,
			author: `${config.author.email} (${config.author.name})`,
			content: sanitizeHtml(parser.render(post.body ?? ""), {
				allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "pre", "code", "span"]),
				allowedAttributes: {
					...sanitizeHtml.defaults.allowedAttributes,
					img: ["src", "alt", "title", "loading", "decoding"],
					code: ["class"],
					span: ["class"],
					pre: ["class"],
					a: ["href", "name", "target", "rel"],
				},
			}),
			customData: `<dc:language>${post.data.lang}</dc:language>`,
		})),
	});
}
