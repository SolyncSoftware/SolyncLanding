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
        <span class="rounded-full bg-black/80 px-6 py-2 font-medium first-letter:uppercase">{categories[0]}</span>

        <div class="flex flex-row items-center gap-2 rounded-full bg-black/80 py-2 pr-6 pl-2">
            <img src={teamMember?.avatarSrc || '/images/avatarplaceholder.svg'} alt="Profile" class=" h-11 w-11 rounded-full" />
            <div class="flex flex-col">
                <span class="leading-5 font-medium">{teamMember?.realName || 'No name lol'}</span>
                <span class="text-sm text-white/80">{teamMember?.username || author || 'Please add an author'}</span>
            </div>
        </div>
    </div>
    <h1 class="text-accent ml-9 truncate text-4xl font-black text-wrap xl:text-5xl">{title}</h1>
    <div class="mb-8 ml-9 flex flex-row items-center gap-4">
        <span class="text-2xl font-black text-black/90">{Formatting.formatDate(new Date(date).getTime() / 1000)}</span>
        <span class="h-fit rounded-full bg-black/90 p-1"></span>
        <span class="text-lg text-black/80">{categories.join(', ')}</span>
    </div>

    <div class="markdown rounded-4xl bg-white p-9 text-2xl">
        {@render children()}
    </div>

    <!-- <img src={image || '/images/articles/fallback.png'} alt="screenshot of news post" class="h-94 w-full rounded-4xl object-cover" /> -->

    <!-- <div class="flex flex-col gap-18 xl:flex-row">
        <div class="markdown font-sans text-2xl xl:flex-2">
            <h1 class="font-display mb-12 truncate text-4xl font-bold text-wrap uppercase xl:text-5xl">{title}</h1>

            <div class="font-display mb-6 xl:hidden">
                <p class="bg-accent mb-11 w-fit truncate p-4 text-2xl font-bold text-black uppercase">{categories[0]}</p>
                <div class="border-accent flex flex-col border-l-6 pl-9">
                    <img src={teamMember?.avatarSrc || '/images/avatarplaceholder.svg'} alt="Profile" class="m-0! mb-3! h-46 w-46" />
                    <span class="text-3xl font-bold">{teamMember?.realName || 'No name lol'}</span>
                    <span class="font-sans text-2xl leading-7 font-light text-black/75">
                        {teamMember?.username || author || 'Please add a author'}
                    </span>
                    <span class="mt-8 font-sans text-2xl font-bold">{Formatting.formatDate(new Date(date).getTime() / 1000)}</span>
                    <span class="font-sans text-lg font-light text-black/75">Tags: {categories.join(', ')}</span>
                </div>
            </div>

            {@render children()}
        </div>
        <div class="hidden flex-1 xl:block">
            <p class="bg-accent mb-11 w-fit py-4 pr-10 pl-5 text-3xl font-bold text-black uppercase">{categories[0]}</p>

            <div class="border-accent flex flex-col border-l-6 pl-9">
                <img src={teamMember?.avatarSrc || '/images/avatarplaceholder.svg'} alt="Profile" class="mb-3 h-46 w-46" />
                <span class="text-3xl font-bold">{teamMember?.realName || 'No name lol'}</span>
                <span class="font-sans text-2xl leading-7 font-light text-black/75">
                    {teamMember?.username || author || 'Please add a author'}
                </span>
                <span class="mt-8 font-sans text-2xl font-bold">{Formatting.formatDate(new Date(date).getTime() / 1000)}</span>
                <span class="font-sans text-lg font-light text-black/75">Tags: {categories.join(', ')}</span>
            </div>
        </div>
    </div> -->

    <div class="mt-26">
        <p class="text-accent mb-9 text-5xl font-bold">Read More</p>
        {#if loading}
            <p class="text-xl">Loading articles...</p>
        {:else if blogArticles.length === 0}
            <p class="text-xl text-gray-400">No articles found.</p>
        {:else}
            <div class="grid grid-cols-1 gap-8 xl:grid-cols-3">
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
