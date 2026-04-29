<script lang="ts">
    import NetroGlobe from '$lib/components/assets/NetroGlobe.svelte';
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

<section class="relative -my-16 -mr-21 grid min-h-screen grid-cols-[1fr_410px] grid-rows-[auto_auto]">
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
        <NetroGlobe
            style="position: absolute !important; 
                   width: 1400px !important; 
                   height: 1400px !important; 
                   object-position: bottom right !important; 
                   mix-blend-mode: screen; 
                   transform: translate(47%, 0%);"
        />
    </div>
    <div class="transform-0 col-start-1 row-start-1 flex flex-col items-start gap-12">
        <div class="pt-21">
            <a href="/">
                <img src="/images/logo-blue.svg" alt="netro logo" width="540" height="118" />
            </a>
        </div>
        <span class="font-display max-w-194 text-xl">
            <p>We create software, NetroHost, Gardens Wiki, and more.</p>
            <br />
            <p>
                We're a small software collective creating what we love. It's not only because we want to, we need to. We collaborate to
                create what's next.
            </p>
        </span>
        <div class="flex flex-row items-start gap-8 text-xl">
            <a href="/about" class="flex flex-row items-center gap-4 hover:opacity-70">
                <span class="font-display">LEARN MORE</span>
                <img src="/images/arrow-default.png" alt="arrow pointing down" />
            </a>

            <a href="/apply" class="flex flex-row items-center gap-4 hover:opacity-70">
                <span class="font-display">JOIN US</span>
                <img src="/images/arrow-default.png" alt="arrow pointing down" />
            </a>
        </div>
    </div>

    <!-- todo: fit in new projects -->
    <div class="col-start-1 row-start-2 mt-12 flex gap-8">
        <a href="https://netro.host/" class="relative">
            <img src="/images/netrohost.png" alt="NetroHost" class="h-40 w-134 object-cover" />
            <span
                class="font-display bg-accent absolute top-0 left-0 -translate-x-3 -translate-y-4 py-1.5 pr-20 pl-2.5 text-3xl font-bold text-black"
            >
                NETROHOST
            </span>
        </a>

        <a href="https://alpha.potaro.wiki/news/gardens-wiki" class="relative">
            <img src="/images/gardens-wiki.png" alt="Gardens Wiki" class="h-40 w-134 object-cover" />
            <span
                class="font-display bg-accent absolute top-0 left-0 -translate-x-3 -translate-y-4 py-1.5 pr-20 pl-2.5 text-3xl font-bold text-black"
            >
                GARDENS WIKI
            </span>
        </a>
    </div>

    <aside class="z-5 col-start-2 row-span-2 row-start-1 flex h-full flex-col items-end bg-black/60 py-18 pr-16 text-white">
        <h2 class="mb-8 text-5xl font-bold">Blog</h2>
        {#if loading}
            <div class="text-xl">Loading contents please wait...</div>
        {:else if blogArticles.length === 0}
            <div class="text-error text-xl">No articles found!</div>
        {:else}
            <div class="flex flex-col gap-6">
                {#each blogArticles as article (article.slug)}
                    <a
                        href={article.slug}
                        class="font-display text-accent w-100 bg-black/75 text-right transition-colors duration-300 hover:text-white"
                    >
                        <img
                            loading="lazy"
                            src={article.image || '/images/fallback.png'}
                            alt="screenshot of news post"
                            class="h-56 w-full object-cover"
                        />
                        <div
                            class="bg-accent absolute -translate-x-2 -translate-y-6 justify-self-end px-2 py-1 text-xl font-bold text-black uppercase"
                        >
                            {article.categories[0]}
                        </div>
                        <!-- jack shit because it would show 3 lines even with line-clamp -->
                        <div class="border-accent border-b-12 px-6 py-4">
                            <div class="line-clamp-2 text-2xl font-bold uppercase">
                                {article.title}
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}

        <a href="/blog" class="flex flex-row items-center gap-4 pt-8 pl-22 hover:opacity-70">
            <span class="font-display text-xl">READ MORE</span>
            <img src="/images/arrow-default.png" alt="arrow pointing down" />
        </a>
    </aside>
</section>
