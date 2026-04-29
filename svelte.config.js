import adapter from '@sveltejs/adapter-auto'
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

import { mdsvex, escapeSvelte } from 'mdsvex'
import { createHighlighter } from 'shiki'
import rehypeFigure from 'rehype-figure'

import path from 'path';
import { fileURLToPath } from 'url';
const dirname = path.resolve(fileURLToPath(import.meta.url), '../');

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
		highlight: {
		highlighter: async (code, lang = 'text') => {
			const highlighter = await createHighlighter({
				themes: ['poimandres'],
				langs: ['javascript', 'typescript']
			})
			await highlighter.loadLanguage('javascript', 'typescript')
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme: 'poimandres' }))
			return `{@html \`${html}\` }`
		}
	},
	rehypePlugins: [rehypeFigure],
	layout: {
		_: path.join(dirname, './src/lib/components/layouts/DefaultLayout.svelte'),
		blog: path.join(dirname, './src/lib/components/layouts/BlogLayout.svelte')
	},
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: {
		adapter: adapter()
	}
}

export default config