// +page.server.ts
import type { PageServerLoad } from '../$types.js';

export const load: PageServerLoad = async ({ fetch }) => {
    const res = await fetch('/api/articles');
    const articles = await res.json();
    return {
        articles,
        meta: {
            title: 'Solync / Articles and updates from Solync',
            description: 'Articles and updates from Solync',
            image: '/images/banner.png'
        }
    };
};
