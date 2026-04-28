export type Categories = 'sveltekit' | 'svelte' | 'legal' | 'other' | 'blog';

export type Article = {
    title: string;
    slug: string;
    description: string;
    date: string;
    categories: Categories[];
    published: boolean;
    image?: string;
};
