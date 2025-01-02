import antfu from "@antfu/eslint-config"

const operatorLinebreak = [
	"error",
	"after",
	{
		overrides: { "?": "before", ":": "before" },
	},
]

export default antfu(
	{
		// unocss: true, on when uno.config.ts added
		// typescript: true,
		vue: { vueVersion: 2 },
		stylistic: { quotes: "double", indent: "tab" },
	},
	{
		name: "the-project",
		rules: {
			"no-console": "off",
			"no-undef": "off", //TODO smarter
			"no-unused-vars": ["warn"],
			"unused-imports/no-unused-vars": ["warn"],
			"no-use-before-define": [
				"error",
				{
					functions: false,
					classes: false,
					variables: false,
					allowNamedExports: true,
				},
			],
			"style/operator-linebreak": operatorLinebreak,
			"style/spaced-comment": "off",
			"style/arrow-parens": ["error", "always"],
			"import/first": "off",
			"antfu/if-newline": "off",
			"perfectionist/sort-imports": "off",
			"vue/operator-linebreak": operatorLinebreak,
			"vue/max-attributes-per-line": [
				"error",
				{
					singleline: 2,
					multiline: 1,
				},
			],
			"vue/attribute-hyphenation": ["error", "never"],
			"vue/v-on-event-hyphenation": ["error", "never", { autofix: true }],
			"vue/no-mutating-props": ["error", { shallowOnly: true }],
		},
	},
)

// import js from '@eslint/js'
// import pluginVue from 'eslint-plugin-vue'

// export default [
//   {
//     name: 'app/files-to-lint',
//     files: ['**/*.{js,mjs,jsx,vue}'],
//   },

//   {
//     name: 'app/files-to-ignore',
//     ignores: ['**/dist/**', '**/dist-ssr/**', '**/coverage/**'],
//   },

//   js.configs.recommended,
//   ...pluginVue.configs['flat/recommended'],

//   {
//     rules: {
//       'vue/multi-word-component-names': 'off',
//     },
//   }
// ]
