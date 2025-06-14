import { config } from "../config";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

export const resources = {
	fonts: {
		regular: await fs.readFile(path.resolve(config.og.fonts.regular)),
		bold: await fs.readFile(path.resolve(config.og.fonts.bold)),
	},
	photoBase64: await (async () => {
		const buf = await fs.readFile(path.resolve(config.og.photo));
		return "data:image/png;base64," + (await sharp(buf).resize(120, 120).png({ quality: 95 }).toBuffer()).toString("base64");
	})(),
};
