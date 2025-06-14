import { config } from "../config";
import { html } from "satori-html";
import { resources } from "./ogResources";
import { Resvg } from "@resvg/resvg-js";
import dayjs from "dayjs";
import satori from "satori";

export async function createOgImage(title: string, datePublished: Date): Promise<Buffer> {
	const formattedDate = dayjs(datePublished).format("MMMM DD, YYYY");

	const markup = await satori(
		html(`
<div tw="flex flex-col w-full h-full" style="background-color: ${config.og.color.bg}">
	<div tw="flex flex-col w-full h-4/5 p-10 justify-center">
		<div tw="text-2xl mb-6" style="color: ${config.og.color.text}">${formattedDate}</div>
		<div tw="flex text-6xl w-full font-bold" style="color: ${config.og.color.text}">${title}</div>
	</div>
	<div tw="w-full h-1/5 flex p-10 items-center justify-between text-2xl" style="border-top: 1px solid ${config.og.color.bgCode}">
		<div tw="flex items-center">
			<span tw="ml-3" style="color: ${config.og.color.text}">${config.og.website.toLocaleUpperCase()}</span>
		</div>
		<div tw="flex items-center">
			<img src="${resources.photoBase64}" tw="w-15 h-15 rounded-full" />
			<div tw="flex flex-col ml-4">
				<span style="color: ${config.og.color.text}">${config.author.name}</span>
				<span style="color: ${config.og.color.blossom}">${config.author.email}</span>
			</div>
		</div>
	</div>
</div>
`),
		{
			width: config.og.dimensions.width,
			height: config.og.dimensions.height,
			fonts: [
				{
					name: "Inter",
					data: resources.fonts.regular,
					weight: 400,
				},
				{
					name: "Inter",
					data: resources.fonts.bold,
					weight: 700,
				},
			],
		}
	);

	const image = new Resvg(markup, { fitTo: { mode: "width", value: config.og.dimensions.width } });
	return image.render().asPng();
}
