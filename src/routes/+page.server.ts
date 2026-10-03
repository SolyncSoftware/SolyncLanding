import type { Article } from '$lib/utils/types.ts';
import type { TransformedProject } from './api/projects/+server.js';
import type { TransformedMember } from './api/team/+server.js';

export async function load({ fetch }) {
    const [articlesResponse, projectsResponse, teamResponse] = await Promise.all([
        fetch('/api/articles?type=blog'),
        fetch('/api/projects'),
        fetch('/api/team')
    ]);
    const blogArticles: Article[] = await articlesResponse.json();
    const projects: TransformedProject[] = await projectsResponse.json();
    const members: TransformedMember[] = await teamResponse.json();
    return {
        blogArticles,
        projects,
        members,
        hideHeader: true,
        meta: {
            title: 'Solync / Building what comes next, together.',
            description:
                "Solync is a worker-owned organization building what's next. Join us on our journey to create something awesome together.",
            image: '/images/banner.png'
        }
    };
}
