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

<section class="relative grid min-h-screen grid-cols-1 grid-rows-[auto_auto] lg:-my-16 lg:-mr-21 lg:grid-cols-[1fr_410px]">
    <div class="lg:transform-0 col-start-1 row-start-1 flex flex-col items-start gap-12">
        <div class="lg:pt-21">
            <a href="/">
                <NetroLogo class="fill-accent w-70 transition-colors duration-300 ease-in-out hover:fill-white lg:w-135 lg:md:h-29.5" />
            </a>
        </div>

        <span class="font-display text-lg md:max-w-200 md:text-xl">
            <p>We own software like NetroHost, Gardens Wiki, Theaceace, and more.</p>
            <br />
            <p>
                We're a small software collective creating user-first experiences. It's not only because we love to, but we think it's
                ethical. We collaborate to create what's next.
            </p>
        </span>

        <div class="flex flex-col items-start gap-8 text-xl md:flex-row">
            <ButtonSimple text="LEARN MORE" href="/about" />
            <ButtonSimple text="JOIN US" href="/apply" />
        </div>
    </div>

    <div class="col-start-1 row-start-2 mt-12 flex flex-col gap-5">
        <div class="flex flex-col gap-12 lg:flex-row lg:gap-8">
            <!-- Project 1 -->
            <a
                href="https://netro.host"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative inline-block h-fit w-full lg:w-fit"
            >
                <img
                    src="/images/netrohost.webp"
                    alt="NetroHost"
                    loading="lazy"
                    class="outline-accent h-40 w-full object-cover outline-2 transition-all group-hover:outline-white lg:w-134"
                />
                <span
                    class="font-display bg-accent absolute top-0 left-0 -translate-x-3 -translate-y-4 py-1.5 pr-10 pl-2.5 text-2xl font-bold text-black transition-colors group-hover:bg-white lg:pr-20 lg:text-3xl"
                >
                    NETROHOST
                </span>
            </a>

            <a
                href="https://theaceae.org/"
                target="_blank"
                rel="noopener noreferrer"
                class="group relative mt-8 inline-block h-fit w-full lg:mt-0 lg:w-fit"
            >
                <img
                    src="/images/theaceae-banner.webp"
                    alt="Theaceae"
                    loading="lazy"
                    class="outline-accent h-40 w-full object-cover outline-2 transition-all group-hover:outline-white lg:w-134"
                />
                <span
                    class="font-display bg-accent absolute top-0 left-0 -translate-x-3 -translate-y-4 py-1.5 pr-10 pl-2.5 text-2xl font-bold text-black transition-colors group-hover:bg-white lg:pr-20 lg:text-3xl"
                >
                    THEACEAE
                </span>
            </a>
        </div>
    </div>

    <aside
        class="z-5 col-start-1 row-span-1 row-start-3 flex h-full flex-col items-start text-white lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:items-end lg:bg-black/60 lg:py-18 lg:pr-16"
    >
        <h2 class="mt-8 mb-8 text-4xl font-bold lg:mt-0 lg:text-5xl">Blog</h2>

        {#if loading}
            <div class="text-xl">Loading contents...</div>
        {:else if blogArticles.length === 0}
            <div class="text-error text-xl">No articles found!</div>
        {:else}
            <div class="flex w-full flex-col items-center gap-10 lg:items-end lg:gap-6">
                {#each blogArticles as article (article.slug)}
                    <a
                        href={article.slug}
                        class="font-display text-accent relative w-full bg-black/75 text-left transition-colors duration-300 hover:text-white lg:w-100 lg:text-right"
                    >
                        <img
                            loading="lazy"
                            src={article.image || '/images/articles/fallback.png'}
                            alt=""
                            class="h-48 w-full object-cover lg:h-56"
                        />
                        <div
                            class="bg-accent absolute top-auto right-auto -translate-x-2 -translate-y-6 justify-self-end px-2 py-1 text-xl font-bold text-black uppercase"
                        >
                            {article.categories[0]}
                        </div>
                        <div class="border-accent border-b-8 px-6 py-4 lg:border-b-12">
                            <div class="line-clamp-2 text-xl font-bold uppercase lg:text-2xl">
                                {article.title}
                            </div>
                        </div>
                    </a>
                {/each}
            </div>
        {/if}
        <ButtonSimple text="READ MORE" href="/blog" class="mt-8 text-xl lg:pl-22" />
    </aside>
</section>
