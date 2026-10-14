<script lang="ts">
    import type { Article } from '$lib/utils/types.js';
    import ButtonSimple from '../ButtonSimple.svelte';
    import rs from 'rune-scroller';

    interface Props {
        title: Article['title'];
        description: Article['description'];
        link: string;
        category: Article['categories'][number];
        image: Article['image'];
        mobile?: Article['mobile'];
    }
    const { title, description, link, category, image, mobile }: Props = $props();
</script>

<div
    class="z-1 flex min-h-118 rounded-4xl bg-white p-2 text-white shadow-xl/4 transition"
    use:rs={{
        animation: 'fade-up',
        duration: 800,
        repeat: false,
        delay: 0,
        offset: 0
    }}
>
    <div class="relative flex w-full flex-col justify-end gap-2 overflow-hidden rounded-3xl p-5 text-lg">
        <picture class="absolute inset-0 -z-1 h-full w-full bg-black">
            {#if mobile}<source media="(max-width: 639px)" srcset={mobile} />{/if}
            <enhanced:img src={image} alt={title} class="h-full w-full object-cover" class:mobile={!!mobile} loading="lazy" decoding="async" />
        </picture>
        <div class="absolute inset-0 -z-1 bg-linear-to-b from-transparent to-[#000000]"></div>

        <div>
            <h3 class="text-3xl font-black tracking-wide">{title}</h3>
            <p class="-mt-1.5 text-base tracking-wide text-white/60">{category}</p>
        </div>
        <p>{description}</p>

        <div class="flex gap-3">
            <ButtonSimple text="Read more" href={link} class="self-start text-lg! hover:text-white" />
        </div>
    </div>
</div>

<style>
    @media (max-width: 639px) {
        .mobile {
            object-fit: contain;
        }
    }
</style>
