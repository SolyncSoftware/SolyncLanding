export type Categories = 'sveltekit' | 'svelte' | 'legal' | 'other';

export type Article = {
    title: string;
    slug: string;
    description: string;
    date: string;
    categories: Categories[];
    published: boolean;
};
