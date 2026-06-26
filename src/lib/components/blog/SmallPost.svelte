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

<!-- <div class="font-display border-accent relative max-h-146 border-b-12 bg-black/75">
    <img loading="lazy" src={image || '/images/fallback.png'} alt="..." class="h-56 w-full object-cover" />
    <div class="bg-accent absolute ml-5 -translate-y-6 justify-self-start px-2 py-1 text-xl font-bold text-black uppercase">{category}</div>
    <div class="grid h-[calc(100%-14rem)] grid-rows-[1fr_auto] gap-6 p-6">
        <div class="flex flex-col">
            <div class="text-accent line-clamp-2 text-2xl font-bold uppercase">{title}</div>
            <p class="line-clamp-2 text-lg">{description}</p>
        </div>
        <ButtonSimple text="READ MORE" href={link} class="ml-auto w-fit justify-self-end text-lg" />
    </div>
</div> -->

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
