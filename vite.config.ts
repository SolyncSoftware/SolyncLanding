// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-bun';

import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte, mdsvex } from 'mdsvex';
// @ts-expect-error rehype-figure does not provide TypeScript declarations.
import rehypeFigure from 'rehype-figure';
import { createHighlighter } from 'shiki';
import path from 'path';
import { fileURLToPath } from 'url';
import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

const dirname = path.resolve(fileURLToPath(import.meta.url), '../');

/** @type {import('mdsvex').MdsvexOptions} */ const mdsvexOptions = {
    extensions: ['.md'],
    highlight: {
        highlighter: async (code: string, lang: string | null = 'text') => {
            const highlighter = await createHighlighter({ themes: ['poimandres'], langs: ['javascript', 'typescript'] });

            await highlighter.loadLanguage('javascript', 'typescript');

            const html = escapeSvelte(highlighter.codeToHtml(code, { lang: lang ?? 'text', theme: 'poimandres' }));

            return `{@html \`${html}\` }`;
        }
    },
    rehypePlugins: [rehypeFigure],
    layout: {
        _: path.join(dirname, './src/lib/components/mdsvex_layouts/DefaultLayout.svelte'),
        blog: path.join(dirname, './src/lib/components/mdsvex_layouts/BlogLayout.svelte')
    }
};

export default defineConfig({
    plugins: [
        enhancedImages(),
        sveltekit({
            extensions: ['.svelte', '.md'],
            preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
            adapter: adapter()
        }),
        tailwindcss()
    ],
    server: {
        allowedHosts: ['.localhost', '.ngrok.io', '.vercel.app', '.githubpreview.dev', '.trycloudflare.com']
    }
});
