import type { PageServerLoad } from './$types.js';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ fetch }) => {
    const res = await fetch('/api/projects');

    if (!res.ok) {
        throw error(res.status, 'Failed to load projects');
    }

    const projects = await res.json();

    return {
        projects,
        meta: {
            title: 'Solync / About us'
        }
    };
};
