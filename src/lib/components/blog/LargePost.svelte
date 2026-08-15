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
