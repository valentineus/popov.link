export default {
	arrowParens: "always",
	bracketSameLine: false,
	bracketSpacing: true,
	embeddedLanguageFormatting: "auto",
	endOfLine: "lf",
	htmlWhitespaceSensitivity: "ignore",
	insertPragma: false,
	jsxSingleQuote: false,
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro",
			},
		},
		{
			files: "*.json",
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
		{
			files: "*.yml",
			options: {
				tabWidth: 2,
				useTabs: false,
			},
		},
	],
	plugins: ["prettier-plugin-astro"],
	printWidth: 256,
	proseWrap: "never",
	quoteProps: "consistent",
	requirePragma: false,
	semi: true,
	singleAttributePerLine: false,
	singleQuote: false,
	tabWidth: 4,
	trailingComma: "es5",
	useTabs: true,
	vueIndentScriptAndStyle: false,
};
