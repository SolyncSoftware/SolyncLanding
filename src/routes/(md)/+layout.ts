import { error } from '@sveltejs/kit';
import { renderMarkdown } from '$lib/markdown';

const files = import.meta.glob('/src/routes/**/content.md', {
    query: '?raw',
    import: 'default'
}) as Record<string, () => Promise<string>>;

export const load = async ({ route }) => {
    // route.id should look like: "/(md)/legal/privacy"
    const path = `/src/routes${route.id}/content.md`;

    const loader = files[path];
    if (!loader) throw error(404, `No content.md found at ${path}`);

    const source = await loader();
    return await renderMarkdown(source);
};