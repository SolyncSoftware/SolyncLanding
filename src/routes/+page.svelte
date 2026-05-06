<script lang="ts">
    import ButtonSimple from '$lib/components/ButtonSimple.svelte';
    import NetroLogo from '$lib/components/NetroLogo.svelte';
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
    <title>NetroWorks</title>
</svelte:head>

<section class="relative -my-16 -mr-21 grid min-h-screen grid-cols-[1fr_410px] grid-rows-[auto_auto]">
    <div class="transform-0 col-start-1 row-start-1 flex flex-col items-start gap-12">
        <div class="pt-21">
            <a href="/">
                <NetroLogo class="fill-accent transition-colors duration-300 ease-in-out hover:fill-white" width="540" height="118" />
            </a>
        </div>
        <span class="font-display max-w-200 text-xl">
            <p>We own software like NetroHost, Gardens Wiki, Theaceace, and more.</p>
            <br />
            <p>
                We're a small software collective creating user-first experiences. It's not only because we love to, but we think it's
                ethical. We collaborate to create what's next.
            </p>
        </span>
        <div class="flex flex-row items-start gap-8 text-xl">
            <ButtonSimple text="LEARN MORE" href="/about" />
            <ButtonSimple text="JOIN US" href="/apply" />
        </div>
    </div>

    <!-- todo: refactor to include projects page and have latest projects be displayed -->
    <div class="col-start-1 row-start-2 mt-12 flex flex-col gap-5">
        <!-- Row for the project banners -->
        <div class="flex gap-8">
            <a href="https://netro.host" target="_blank" rel="noopener noreferrer" class="group relative inline-block h-fit">
                <img
                    src="/images/netrohost.webp"
                    alt="NetroHost"
                    loading="lazy"
                    class="outline-accent h-40 w-134 object-cover outline-2 transition-all group-hover:outline-white"
                />
                <span
                    class="font-display bg-accent absolute top-0 left-0 -translate-x-3 -translate-y-4 py-1.5 pr-20 pl-2.5 text-3xl font-bold text-black transition-colors group-hover:bg-white"
                >
                    NETROHOST
                </span>
            </a>

            <a href="https://theaceae.org/" target="_blank" rel="noopener noreferrer" class="group relative inline-block h-fit">
                <img
                    src="/images/theaceae-banner.webp"
                    alt="Gardens Wiki"
                    loading="lazy"
                    class="outline-accent h-40 w-134 object-cover outline-2 transition-all group-hover:outline-white"
                />
                <span
                    class="font-display bg-accent absolute top-0 left-0 -translate-x-3 -translate-y-4 py-1.5 pr-20 pl-2.5 text-3xl font-bold text-black transition-colors group-hover:bg-white"
                >
                    THEACEAE
                </span>
            </a>
        </div>
        <!-- <a href="/projects" class="self-start text-xl transition-all hover:underline">View more projects button thing</a> -->
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
                            src={article.image || '/images/articles/fallback.png'}
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
        <ButtonSimple text="READ MORE" href="/blog" class="pt-8 pl-22 text-xl" />
    </aside>
</section>
