<script lang="ts">
    import SolyncLogo from '$lib/components/SolyncLogo.svelte';
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import OurTeam from '$lib/components/index/OurTeam.svelte';
    import OurProjects from '$lib/components/index/OurProjects.svelte';
    import type { Article } from '$lib/utils/types.js';
    import { onMount } from 'svelte';
    import rs from 'rune-scroller';

    let blogArticles = $state<Article[]>([]);
    let loading = $state(true);

    onMount(async () => {
        const res = await fetch('/api/articles?type=blog'),
            articles: Article[] = await res.json();
        blogArticles = articles.slice(0, 2);
        loading = false;
    });
</script>

<section class="flex flex-col gap-14">
    <div
        use:rs={{
            animation: 'fade-up',
            duration: 1000,
            repeat: false
        }}
    >
        <PageContainer>
            <SolyncLogo class="mb-10 w-70 fill-white md:mb-24 md:w-110" />
            <h1 class="text-4xl font-bold md:text-6xl">Building what comes next, <span class="font-extrabold">together</span>.</h1>
            <p class="mt-4 text-2xl font-semibold md:max-w-170">
                We're Solync. We create software like Porter Robinson Wiki, Gardens Wiki, and more.
            </p>
            <p class="mt-4 text-2xl font-semibold md:max-w-170">
                We're an independent software collective creating user-first experiences. Not just because we love it, but because it's
                ethical. We collaborate to create what's next.
            </p>
            <p class="mt-4 text-2xl font-semibold md:max-w-170">
                <a href="/about" class="underline hover:text-black">Learn more about us.</a>
            </p>
        </PageContainer>
    </div>

    <div>
        <h2 class="text-accent mb-4 text-5xl font-bold">Our Projects</h2>
        <OurProjects />

        <div class="mt-8">
            <a
                href="/about#our-work"
                class="text-accent group flex w-fit items-center gap-2.5 text-4xl font-bold transition-all ease-in-out hover:text-black"
                >See more projects
                <img
                    src="/images/arrow-sorange.svg"
                    alt="Arrow"
                    class="-rotate-90 overflow-hidden transition-all duration-200 group-hover:ml-2"
                />
            </a>
        </div>
    </div>

    <div>
        <h2 class="text-accent mb-4 text-5xl font-bold">Our People</h2>
        <OurTeam />
    </div>

    <!-- may remove this or make it a component. so far its only in the about page -->
    <div class="flex w-full flex-col items-center justify-center gap-4 text-center text-4xl font-bold">
        <p>Building what comes next, together.</p>
        <SolyncLogo iconOnly={true} class="fill-accent w-30" />
    </div>
</section>
