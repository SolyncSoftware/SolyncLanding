// +page.server.ts
import type { PageServerLoad } from '../$types.js';

export const load: PageServerLoad = async ({ fetch }) => {
    const res = await fetch('/api/articles?type=blog');
    const blogArticles = await res.json();
    return {
        blogArticles,
        meta: {
            title: 'Solync / Blog',
            description: 'Articles and updates from Solync',
            image: '/images/banner.png'
        }
    };
};
