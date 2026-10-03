import type { TransformedProject } from '../api/projects/+server.js';

export async function load({ fetch }) {
    const [projectsResponse] = await Promise.all([fetch('/api/projects')]);
    const projects: TransformedProject[] = await projectsResponse.json();

    return {
        projects,
        meta: {
            title: 'Solync / About us'
        }
    };
}
