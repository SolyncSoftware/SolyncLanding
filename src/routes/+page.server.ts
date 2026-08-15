import type { Article } from '$lib/utils/types.ts';

export async function load({ fetch }) {
    const response = await fetch('/api/articles');
    const articles: Article[] = await response.json();
    return {
        articles,
        hideHeader: true,
        meta: {
            title: 'Solync / Building what comes next, together.',
            description:
                "Solync is a worker-owned organization building what's next. Join us on our journey to create something awesome together.",
            image: '/images/banner.png'
        }
    };
}
