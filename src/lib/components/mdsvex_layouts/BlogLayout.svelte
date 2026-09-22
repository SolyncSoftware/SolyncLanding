<!-- 
    Layout used for blog articles.
-->

<script lang="ts">
    import SmallPost from '$lib/components/blog/SmallPost.svelte';
    import type { Article } from '$lib/utils/types.js';
    import { onMount, type Snippet } from 'svelte';
    import type { TransformedMember } from '../../../routes/api/team/+server.js';
    import Formatting from '$lib/utils/formatting.js';

    const { title, author, date, categories, image, children }: Article & { children: Snippet } = $props();

    let blogArticles = $state<Article[]>([]);
    let loading = $state(true);
    let teamMember = $state<TransformedMember | undefined>();

    onMount(async () => {
        const res = await fetch('/api/articles?type=blog');
        const articles: Article[] = await res.json();
        blogArticles = articles
            .map((article) => {
                article.slug = article.slug.replace('blog', '/blog');
                return article;
            })
            .slice(0, 3);

        const teamRes = await fetch('/api/team');
        const team: TransformedMember[] = await teamRes.json();
        teamMember = team.find(
            (member) => member.username?.toLowerCase() === author?.toLowerCase() || member.realName?.toLowerCase() === author?.toLowerCase()
        );
        loading = false;
    });
</script>

<article>
    <div
        class="mb-8 flex min-h-94 flex-col items-start justify-between rounded-4xl bg-cover bg-center p-4 text-lg text-white"
        style="background-image: url({image || '/images/articles/fallback.png'})"
    >
        <span class="rounded-full bg-black/80 px-6 py-2 font-black first-letter:uppercase">{categories[0]}</span>

        <div class="flex flex-row items-center gap-2 rounded-full bg-black/80 py-2 pr-6 pl-2">
            <enhanced:img src={teamMember?.avatarSrc || '/images/avatarplaceholder.svg'} alt="Profile" class=" h-11 w-11 rounded-full" />
            <div class="flex flex-col">
                <span class="leading-5 font-black">{teamMember?.realName || 'No name lol'}</span>
                <span class="text-sm font-bold text-white/80">{teamMember?.username || author || 'Please add an author'}</span>
            </div>
        </div>
    </div>
    <h1 class="text-accent ml-9 truncate text-4xl font-black text-wrap xl:text-6xl">{title}</h1>
    <div class="mb-4 ml-9 flex flex-row items-center gap-4">
        <span class="text-2xl font-black text-black/90">{Formatting.formatDate(new Date(date).getTime() / 1000)}</span>
        <span class="h-fit rounded-full bg-black/90 p-0.75"></span>
        <span class="text-lg font-semibold text-black/90">{categories.join(', ')}</span>
    </div>

    <div class="markdown rounded-4xl bg-white p-9 text-xl shadow-xl/6">
        {@render children()}
    </div>

    <div class="mt-26">
        <p class="text-accent mb-4 text-4xl font-bold">Read More</p>
        {#if loading}
            <p class="text-xl">Loading articles...</p>
        {:else if blogArticles.length === 0}
            <p class="text-xl text-black">No articles found.</p>
        {:else}
            <div class="grid grid-cols-1 gap-4 xl:grid-cols-3">
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
    </div>
</article>
