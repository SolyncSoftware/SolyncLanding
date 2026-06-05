<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import Waves from '$lib/components/assets/Waves.svelte';
    import SolyncLogo from '$lib/components/SolyncLogo.svelte';
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import OurTeam from '$lib/components/index/OurTeam.svelte';
    import OurProjects from '$lib/components/index/OurProjects.svelte';
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

<section class="flex flex-col gap-14">
    <PageContainer>
        <SolyncLogo class="mb-24 w-110 fill-white" />
        <h1 class="text-4xl font-bold md:text-5xl">Building what comes next, <span class="font-extrabold">together</span>.</h1>
        <p class="mt-4 text-lg md:max-w-170 md:text-xl">We're Solync. We create software like StreamSkinner, Gardens Wiki, and more.</p>
        <p class="mt-4 text-lg md:max-w-170 md:text-xl">
            We're an independent software collective creating user-first experiences. It's not only because we love to, but we think it's
            ethical. We collaborate to create what's next.
        </p>
    </PageContainer>

    <div>
        <h2 class="text-accent mb-4 text-5xl font-bold">Our Projects</h2>
        <OurProjects />
        <Button text="See More" href="/projects" class="mt-4 w-fit text-xl! font-bold" />
    </div>

    <div>
        <h2 class="text-accent mb-4 text-5xl font-bold">Our People</h2>
        <OurTeam />
    </div>
</section>
