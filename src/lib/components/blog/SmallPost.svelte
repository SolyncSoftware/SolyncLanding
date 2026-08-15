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

<!-- <div class="border-offwhite flex flex-col overflow-hidden rounded-4xl bg-white/80 shadow-xl/4 transition">
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
</div> -->

<div class="flex min-h-118 rounded-4xl bg-white p-2 text-white shadow-xl/4 transition">
    <div
        class="flex w-full flex-col justify-end gap-2 rounded-3xl bg-cover bg-center p-5 text-lg"
        style="background-image: linear-gradient(to bottom, transparent, rgba(0,0,0,1)), url('{image}');"
    >
        <div>
            <h3 class="text-accent text-3xl font-bold tracking-wide">{title}</h3>
            <p class="-mt-1.5 text-base font-light tracking-wide text-white/60">{category}</p>
        </div>
        <p>{description}</p>

        <div class="flex gap-3">
            <ButtonSimple text="Read more" href={link} class="self-start text-lg! hover:text-white" />
        </div>
    </div>
</div>
