<script lang="ts">
    import SolyncLogo from '$lib/components/SolyncLogo.svelte';
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import Waves from '$lib/components/assets/Waves.svelte';
    import OurTeam from '$lib/components/index/OurTeam.svelte';
    import OurProjects from '$lib/components/index/OurProjects.svelte';
    import SmallPost from '$lib/components/blog/SmallPost.svelte';
    import type { Article } from '$lib/utils/types.js';
    import { onMount } from 'svelte';
    import rs from 'rune-scroller';
    import Button from '$lib/components/Button.svelte';
    import { SiDiscord, SiGithub } from '@icons-pack/svelte-simple-icons';
    import { Mail } from '@lucide/svelte';

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
        class="text-white shadow-2xl/20"
        use:rs={{
            animation: 'fade-up',
            duration: 1000,
            repeat: false
        }}
    >
        <PageContainer wavesType="/solync_home.json" innerClass="text-accent [&_p]:text-2xl" className="" wavesStyle="" showDim={false}>
            <img src="/images/home-logo.svg" alt="home logo" aria-hidden="true" class="pointer-events-none absolute -m-9 object-cover" />

            <div class="mt-70 max-w-160">
                <h1 class="text-4xl md:text-7xl">Building what comes next, <span class="font-extrabold">together</span>.</h1>
                <p class="mt-4 font-medium">
                    We're an independent software collective creating user-first experiences. Not just because we love it, but because it's
                    ethical. We collaborate to create what's next.
                </p>
            </div>

            <div class="mt-4 flex flex-row flex-wrap items-center gap-2">
                <Button
                    class="bg-accent! hover:bg-accent! w-fit self-center! px-10 text-xl! font-bold text-white! shadow-none transition-all
                   hover:-translate-y-1 hover:shadow-[0_5px_0px_#00000022] sm:px-14"
                    href="/about"
                    text="Learn more"
                />
                <a
                    href="https://discord.gg/nUeRyRtDYC"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-offwhite/20 border-accent rounded-full border p-3.5 transition-all hover:-translate-y-1 hover:shadow-[0_5px_0px_#00000022]"
                >
                    <SiDiscord />
                </a>
                <a
                    href="https://github.com/SolyncSoftware"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-offwhite/20 border-accent rounded-full border p-3.5 transition-all hover:-translate-y-1 hover:shadow-[0_5px_0px_#00000022]"
                >
                    <SiGithub />
                </a>
                <a
                    href="/contact"
                    class="bg-offwhite/20 border-accent rounded-full border p-3.5 transition-all hover:-translate-y-1 hover:shadow-[0_5px_0px_#00000022]"
                >
                    <Mail />
                </a>
            </div>
        </PageContainer>
    </div>

    <!-- <p
        class="text-5xl leading-16 font-bold text-black md:max-w-260"
        use:rs={{
            animation: 'fade',
            duration: 1000,
            repeat: false
        }}
    >
        We're a group of hobbyists who believe in <span class="text-accent">worker-managed software</span> and create things we collectively believe
        in.
    </p> -->

    <div class="space-y-4">
        <h2 class="text-5xl font-black">Our projects.</h2>
        <p class="text-xl font-medium md:max-w-140">
            We collaboratively build tools that spark our curiosity and address human needs, with a user-first approach.
        </p>
        <!-- <div>
            <a
                href="/about#our-work"
                class="text-accent group flex w-fit items-center gap-2 text-2xl font-bold transition-all ease-in-out hover:text-black"
                >see more
                <img
                    src="/images/arrow-sorange.svg"
                    alt="Arrow"
                    class="w-7 -rotate-90 overflow-hidden transition-all duration-200 group-hover:ml-1"
                    loading="lazy"
                />
            </a>
        </div> -->
        <OurProjects />
        <div class="flex w-full flex-col items-end">
            <a
                href="/about#our-work"
                class="text-accent group flex w-fit items-center gap-2 text-3xl font-bold transition-all ease-in-out hover:text-black"
            >
                see more projects
                <img
                    src="/images/arrow-sorange.svg"
                    alt="Arrow"
                    class="w-7 -rotate-90 overflow-hidden transition-transform duration-200 group-hover:translate-x-2"
                    loading="lazy"
                />
            </a>
        </div>
    </div>

    <div class="space-y-4">
        <h2 class="text-5xl font-black">Meet the team.</h2>
        <p class="text-xl font-medium md:max-w-110">
            The people who made all this possible. Interested? <a href="/apply" class="text-accent hover:underline">Join us</a>, and help
            build what's next, together.
        </p>
        <OurTeam />
    </div>

    <div class="space-y-4">
        <h2 class="text-5xl font-black">From the Blog.</h2>
        <p class="text-xl font-medium md:max-w-140">Words from the people behind Solync.</p>
        {#if loading}
            <p class="text-xl">Loading articles...</p>
        {:else if blogArticles.length === 0}
            <p class="text-xl text-black">No articles found.</p>
        {:else}
            <div class="grid grid-cols-1 gap-4 xl:grid-cols-2">
                {#each blogArticles as article}
                    <SmallPost
                        title={article.title}
                        description={article.description}
                        link={article.slug}
                        category={article.categories[0]}
                        image={article.image || '/images/articles/fallback.png'}
                    />
                {/each}
            </div>
        {/if}
        <div class="flex w-full flex-col items-end">
            <a
                href="/blog"
                class="text-accent group flex w-fit items-center gap-2 text-3xl font-bold transition-all ease-in-out hover:text-black"
            >
                more from the blog
                <img
                    src="/images/arrow-sorange.svg"
                    alt="Arrow"
                    class="w-7 -rotate-90 overflow-hidden transition-transform duration-200 group-hover:translate-x-2"
                    loading="lazy"
                />
            </a>
        </div>
    </div>

    <!-- may remove this or make it a component. so far its only in the about page -->
    <div class="flex w-full flex-col items-center justify-center gap-4 text-center text-4xl font-bold">
        <p>Building what comes next, together.</p>
        <SolyncLogo iconOnly={true} class="fill-accent w-30" />
    </div>
</section>
