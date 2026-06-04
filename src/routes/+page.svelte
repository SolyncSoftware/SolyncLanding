<script lang="ts">
    import ButtonSimple from '$lib/components/ButtonSimple.svelte';
    import Waves from '$lib/components/assets/Waves.svelte';
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
    <div class="border-offwhite relative w-full overflow-hidden rounded-4xl border-4 text-white">
        <Waves
            className="lg:h-full h-fit overflow-hidden"
            style="z-index: -1; overflow: hidden;"
            wavesType="/solync_waves.json"
            backgroundImage="/images/waves.png"
            backgroundSize="cover"
        />

        <div class="relative z-10 p-12">
            <SolyncLogo class="mb-24 w-110 fill-white" />
            <h1 class="text-4xl font-extrabold md:text-5xl">Building what comes next, together.</h1>
            <p class="mt-4 text-lg md:max-w-170 md:text-xl">We're Solync. We create software like StreamSkinner, Gardens Wiki, and more.</p>
            <p class="mt-4 text-lg md:max-w-170 md:text-xl">
                We're an independent software collective creating user-first experiences. It's not only because we love to, but we think
                it's ethical. We collaborate to create what's next.
            </p>
        </div>
    </div>
</section>
