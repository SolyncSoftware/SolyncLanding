<script lang="ts">
    import LargePost from '$lib/components/blog/LargePost.svelte';
    import SmallPost from '$lib/components/blog/SmallPost.svelte';
    import type { Article } from '$lib/utils/types.js';
    import { onMount } from 'svelte';

    let blogArticles = $state<Article[]>([]);
    let loading = $state(true);

    onMount(async () => {
        const res = await fetch('/api/articles?type=blog');
        blogArticles = await res.json();
        loading = false;
    });
</script>
<div class="p-4 pt-12 lg:p-10 bg-offaccent">
    <h1 class="text-5xl font-bold text-white leading-oneline">Articles.</h1>
</div>
<article class="flex w-full flex-col gap-12">
    {#if loading}
        <p class="text-xl text-white">Loading contents please wait...</p>
    {:else if blogArticles.length === 0}
        <p class="text-error text-xl">No articles found!</p>
    {:else}
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-1 gap-4 md:grid-cols-2 md:[&>*:first-child]:col-span-2">
                {#each blogArticles as article (article.slug)}
                    <SmallPost
                        title={article.title}
                        description={article.description}
                        link={article.slug}
                        category={article.categories[0]}
                        image={article.image || '/images/articles/fallback.png'}
                    />
                {/each}
            </div>
        </div>
    {/if}
</article>
