import { error } from '@sveltejs/kit';
import type { Component } from 'svelte'; // 👈 Change this import
import type { Article } from '$lib/utils/types.ts';

interface MdsvexModule {
    default: Component;
    metadata: Omit<Article, 'slug'>;
}

const articles = import.meta.glob<MdsvexModule>('/src/articles/**/*.md', { eager: true });

export function load({ params }) {
    const slug = params.slug;
    const path = `/src/articles/${slug}.md`;
    const module = articles[path];

    if (!module) {
        error(404, `Could not find ${slug}`);
    }

    return {
        content: module.default,
        meta: module.metadata
    };
}
