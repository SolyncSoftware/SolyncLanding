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

<!-- <div class="font-display border-accent relative border-b-12 bg-white">
    <img loading="lazy" src={image || '/images/fallback.png'} alt="screenshot of news post" class="h-92 w-full object-cover" />
    <div class="bg-accent absolute ml-8 -translate-y-6 justify-self-start px-2 py-1 text-xl font-bold text-white uppercase">{category}</div>
    <div class="flex flex-col justify-between p-8 xl:flex-row">
        <div class="flex max-w-190 flex-col">
            <div class="text-accent line-clamp-1 text-3xl font-bold uppercase">{title}</div>
            <p class="line-clamp-3 text-xl">
                {description}
            </p>
        </div>
        <ButtonSimple text="READ MORE" href={link} class="self-end text-lg" />
    </div>
</div> -->

<div class="border-offwhite flex flex-col overflow-hidden rounded-4xl bg-white/80 shadow-xl/4 transition">
    <img loading="lazy" src={image || '/images/fallback.png'} alt={`${image}`} class="h-92 w-full rounded-4xl object-cover p-1" />
    <div
        class="absolute ml-5 translate-y-6 justify-self-start rounded-full bg-black/80 px-6 py-2 text-lg font-medium text-white first-letter:uppercase"
    >
        {category}
    </div>
    <div class="flex h-full flex-col px-6 pt-1 pb-6 text-lg">
        <h3 class="text-accent text-3xl font-bold">{title}</h3>
        <p class="line-clamp-3 text-xl leading-5">{description}</p>

        <div class="mt-auto flex gap-4">
            <ButtonSimple text="Read more" href={link} class="mt-4 self-start text-lg" />
        </div>
    </div>
</div>
