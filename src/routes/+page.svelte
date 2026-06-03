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
    <span class="font-display text-lg md:max-w-206 md:text-xl">
        <p class="md:max-w-200">We own software like Solynchosting, Gardens Wiki, Theaceae, and more.</p>
        <br />
        <p>
            We're an independent software collective creating user-first experiences. It's not only because we love to, but we think it's
            ethical. We collaborate to create what's next.
        </p>
    </span>
</section>
