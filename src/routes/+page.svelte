<script lang="ts">
    import SolyncLogo from '$lib/components/SolyncLogo.svelte';
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
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
        class="text-white"
        use:rs={{
            animation: 'fade-up',
            duration: 1000,
            repeat: false
        }}
    >
        <PageContainer
            containerClass="overflow-visible"
            innerClass="py-20 min-h-184 flex flex-col items-center justify-between gap-6 text-center bg-cover bg-center"
        >
            <h1 class="text-shadow-home max-w-162 text-4xl font-extralight md:text-7xl">
                Building what comes next, <span class="font-extrabold">together</span>.
            </h1>
            <p class="text-shadow-home text-2xl md:max-w-147">
                We're an independent software collective creating user-first experiences. Not just because we love it, but because it's
                ethical. We collaborate to create what's next.
            </p>

            <div
                class="bg-offwhite border-offaccent absolute bottom-0 left-1/2 z-10 flex w-full -translate-x-1/2 translate-y-1/2 flex-col items-center justify-between gap-4 overflow-visible rounded-full p-4 text-black sm:flex-row md:max-w-270"
            >
                <div class="flex flex-row items-center gap-2">
                    <Button
                        class="hover:bg-offaccent! w-fit self-center! px-14 text-xl! font-bold shadow-none
         transition-all hover:-translate-y-1 
         hover:shadow-[0_5px_0px_#00000022]"
                        href="/about"
                        text="Learn More"
                    />
                    <a
                        href="https://discord.gg/nUeRyRtDYC"
                        target="_blank"
                        class="bg-offwhite/20 border-offaccent rounded-full border p-3.5
         transition-all hover:-translate-y-1 hover:shadow-[0_5px_0px_#00000022]"
                        ><SiDiscord class="text-offaccent" />
                    </a>

                    <a
                        href="https://github.com/SolyncSoftware"
                        target="_blank"
                        class="bg-offwhite/20 border-offaccent rounded-full border p-3.5 transition-all hover:-translate-y-1
         hover:shadow-[0_5px_0px_#00000022]"
                        ><SiGithub class="text-offaccent" />
                    </a>
                    <a
                        href="/contact"
                        class="bg-offwhite/20 border-offaccent rounded-full border p-3.5 transition-all hover:-translate-y-1
         hover:shadow-[0_5px_0px_#00000022]"
                        ><Mail class="text-offaccent" />
                    </a>
                </div>
                Scroll down!
            </div>
        </PageContainer>
    </div>

    <p
        class="text-5xl leading-16 font-bold text-black md:max-w-260"
        use:rs={{
            animation: 'fade',
            duration: 1000,
            repeat: false
        }}
    >
        We're a group of hobbyists who believe in <span class="text-accent">worker-managed software</span> and create things we collectively believe
        in.
    </p>

    <div class="space-y-4">
        <h2 class="text-5xl font-bold">Our projects.</h2>
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
        <h2 class="text-5xl font-bold">Meet the team.</h2>
        <p class="text-xl font-medium md:max-w-110">
            The people who made all this possible. Interested? <a href="/apply" class="text-accent hover:underline">Join us</a> and help build
            what comes next, together.
        </p>
        <OurTeam />
    </div>

    <div class="space-y-4">
        <h2 class="text-5xl font-bold">From the Blog.</h2>
        <p class="text-xl font-medium md:max-w-110">Words from the people behind Solync.</p>
        <!-- <div>
            <a
                href="/blog"
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
                href="/about#our-work"
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

<style>
    .text-shadow-home {
        text-shadow: 0px 10px 12px rgba(0, 0, 0, 0.25);
    }
</style>
