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
    import Hero from '$lib/components/assets/Hero.svelte';

    let blogArticles = $state<Article[]>([]);
    let loading = $state(true);

    // why is it client-side?
    // TODO: Implement SvelteKit's SSR

    onMount(async () => {
        const res = await fetch('/api/articles?type=blog'),
            articles: Article[] = await res.json();
        blogArticles = articles.slice(0, 2);
        loading = false;
    });
</script>

<div class="debug flex flex-col">
    <!-- <div
        class="text-white"
        use:rs={{
            animation: 'fade-up',
            duration: 1000,
            repeat: false
        }}
    > -->
    <Hero innerClass="flex flex-col gap-4 text-white w-fit">
        <!-- <div class="debug absolute top-0 left-0 w-full h-full bg-amber-950"></div> -->
        <div class="flex flex-col gap-3 md:max-w-147">
            <h1 class="text-6xl leading-[0.9em] font-light">Building what comes next, <span class="font-extrabold">together.</span></h1>
            <p class="text-xl font-medium">
                We’re an independent software collective creating user-first experiences. We collaborate to create what’s next.
            </p>
        </div>

        <div class="flex flex-row flex-wrap items-center gap-2 align-middle sm:flex-row">
            <Button
                class="bg-offwhite text-accent! hover:bg-offwhite w-fit self-center! text-xl! font-bold shadow-none
         transition-all hover:-translate-y-1
         hover:shadow-[0_5px_0px_#00000022]"
                href="/about"
                text="Learn more"
            />
            <a
                href="https://discord.gg/nUeRyRtDYC"
                target="_blank"
                class="bg-offwhite/20 rounded-full p-3.5 transition-all hover:-translate-y-1
         hover:shadow-[0_5px_0px_#00000022]"
                ><SiDiscord />
            </a>

            <a
                href="https://github.com/SolyncSoftware"
                target="_blank"
                class="bg-offwhite/20 rounded-full p-3.5 transition-all hover:-translate-y-1
         hover:shadow-[0_5px_0px_#00000022]"
                ><SiGithub />
            </a>
            <a
                href="/contact"
                class="bg-offwhite/20 rounded-full p-3.5 transition-all hover:-translate-y-1
         hover:shadow-[0_5px_0px_#00000022]"
                ><Mail />
            </a>
        </div>
    </Hero>
    <!-- </div> -->

    <article class="flex flex-col gap-14 px-4 py-12 lg:gap-30 lg:px-10 lg:py-30">
        <section>
            <p
                class="text-3xl leading-[1.2em] font-semibold text-black md:max-w-260 md:text-5xl"
                use:rs={{
                    animation: 'fade',
                    duration: 1000,
                    repeat: false
                }}
            >
                We're a group of hobbyists who believe in <span class="text-accent">worker-managed software</span> and create things we collectively
                believe in.
            </p>
        </section>
        <section class="space-y-6">
            <div class="space-y-3">
                <h2 class="text-5xl font-bold">Our projects.</h2>
                <p class="text-xl font-medium md:max-w-140">
                    We collaboratively build tools that spark our curiosity and address human needs, with a user-first approach.
                </p>
                <div class="flex flex-col gap-3">
                    <a
                        href="/about#our-work"
                        class="text-accent group flex w-fit items-center gap-2 transition-all ease-in-out hover:text-black"
                    >
                        <p class="text-xl font-bold">See more</p>
                        <img
                            src="/images/arrow-sorange.svg"
                            alt="Arrow"
                            class="w-7 -rotate-90 overflow-hidden transition-transform duration-200 group-hover:translate-x-2"
                            loading="lazy"
                        />
                    </a>
                </div>
            </div>
            <OurProjects />
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
        </section>

        <section class="space-y-4">
            <h2 class="text-5xl font-bold">Meet the team.</h2>
            <p class="text-xl font-medium md:max-w-110">
                The people who made all this possible. Interested? <a href="/apply" class="text-accent hover:underline">Join us</a>, and
                help build what's next, together.
            </p>
            <OurTeam />
        </section>

        <section class="space-y-6">
            <div class="space-y-3">
                <h2 class="text-5xl font-bold">From the Blog.</h2>
                <p class="text-xl font-medium md:max-w-140">Words from the people behind Solync.</p>
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
                <a href="/blog" class="text-accent group flex w-fit items-center gap-2 transition-all ease-in-out hover:text-black">
                    <p class="text-xl font-bold">See more</p>
                    <img
                        src="/images/arrow-sorange.svg"
                        alt="Arrow"
                        class="w-7 -rotate-90 overflow-hidden transition-transform duration-200 group-hover:translate-x-2"
                        loading="lazy"
                    />
                </a>
            </div>
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
        </section>

        <!-- may remove this or make it a component. so far its only in the about page -->
        <!-- <section class="flex w-full flex-col items-center justify-center gap-4 text-center text-4xl font-bold">
        <p>Building what comes next, together.</p>
        <SolyncLogo iconOnly={true} class="fill-accent w-30" />
    </section> -->
    </article>
</div>
