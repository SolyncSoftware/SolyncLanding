import type { MdsvexModule } from '$lib/utils/types.js';
import { title as siteTitle } from '$lib/config.js';
import { error } from '@sveltejs/kit';

const articles = import.meta.glob<MdsvexModule>('/src/articles/**/*.md', { eager: true });

export function load({ params }) {
    const slug = params.slug;
    const path = `/src/articles/${slug}.md`;
    const module = articles[path];

    if (!module || !module.metadata.published) {
        error(404, `Could not find ${slug}`);
    }

    const meta = module.metadata;

    return {
        content: module.default,
        meta: {
            ...meta,
            title: meta.title ? `${siteTitle} / ${meta.title}` : siteTitle
        }
    };
}


