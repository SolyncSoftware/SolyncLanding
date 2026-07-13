<script lang="ts">
    import type { Article } from '$lib/utils/types.js';
    import ButtonSimple from '../ButtonSimple.svelte';

    interface Props {
        title: Article['title'];
        description: Article['description'];
        link: string;
        category: Article['categories'][number];
        image: Article['image'];
    }
    const { title, description, link, category, image }: Props = $props();
</script>

<div class="border-offwhite flex flex-col overflow-hidden rounded-4xl bg-white/80 shadow-xl/4 transition">
    <img loading="lazy" src={image || '/images/fallback.png'} alt={`${image}`} class="h-55 w-full rounded-4xl object-cover p-1" />
    <div
        class="absolute ml-5 translate-y-6 justify-self-start rounded-full bg-black/80 px-6 py-2 text-lg font-medium text-white first-letter:uppercase"
    >
        {category}
    </div>
    <div class="flex h-full flex-col px-6 pt-1 pb-6 text-lg">
        <h3 class="text-accent text-2xl font-bold">{title}</h3>
        <p class="line-clamp-3 leading-5">{description}</p>

        <div class="mt-auto flex gap-4">
            <ButtonSimple text="Read more" href={link} class="mt-4 self-start text-lg" />
        </div>
    </div>
</div>
