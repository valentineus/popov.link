/// <reference path="../.astro/types.d.ts" />
interface ImportMetaEnv {
	readonly DEFAULT_TITLE: string;
	readonly DEFAULT_DESCRIPTION: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
