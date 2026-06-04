<script lang="ts">
    import ButtonSimple from '$lib/components/ButtonSimple.svelte';
    import SolyncLogo from '$lib/components/SolyncLogo.svelte';
    import type { Article } from '$lib/utils/types.js';
    import { onMount } from 'svelte';

    let blogArticles = $state<Article[]>([]);
    let loading = $state(true);

    onMount(async () => {
        const res = await fetch('/api/articles?type=blog'),
            articles: Article[] = await res.json();
        blogArticles = articles.slice(0, 2);
        loading = false;
    });
</script>

<svelte:head>
    <title>Solync / Building what comes next, together.</title>
</svelte:head>

<section class="flex">
    <!-- <span class="font-display text-lg md:max-w-206 md:text-xl">
        <p class="md:max-w-200">We create software like StreamSkinner, Gardens Wiki, and more.</p>
        <br />
        <p>
            We're an independent software collective creating user-first experiences. It's not only because we love to, but we think it's
            ethical. We collaborate to create what's next.
        </p>
    </span> -->

    <div class="bg-accent w-full rounded-4xl border-4 border-white p-12 text-white">
        <SolyncLogo class="mb-24 w-110 fill-white" />
        <h1 class="font-display text-4xl md:text-5xl">Building what comes next, together.</h1>
        <p class="mt-4 text-lg md:max-w-206 md:text-xl">
            We create software like StreamSkinner, Gardens Wiki, and more. We're an independent software collective creating user-first
            experiences. It's not only because we love to, but we think it's ethical. We collaborate to create what's next.
        </p>
    </div>
</section>
