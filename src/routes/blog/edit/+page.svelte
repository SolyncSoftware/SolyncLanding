<script lang="ts">
    import type { Article } from '$lib/utils/types.js';
    import { onMount, type Snippet } from 'svelte';
    import Textbox from '$lib/components/Textbox.svelte';
    import ButtonSimple from '$lib/components/ButtonSimple.svelte';

    import type { TransformedMember } from '../../../routes/api/team/+server.js';

    let sortedMembers = $state<TransformedMember[]>([]);
    let blogArticles = $state<Article[]>([]);
    let loading = $state(true);

    onMount(async () => {
        const res = await fetch('/api/articles?type=blog');
        blogArticles = await res.json();
        loading = false;

        const teamRes = await fetch('/api/team'),
            members = await teamRes.json();
        sortedMembers = [...members].filter((member) => member.showUser).sort((a, b) => a.realName.localeCompare(b.realName));
        loading = false;
    });
</script>

<!-- replace title with add or edit article if the user is editing an existing article -->
<h1 class="text-5xl font-bold">Add Article</h1>
<div class="mt-6 flex max-w-301 flex-col gap-12 font-sans text-xl">
    <div class="flex w-full flex-col gap-2">
        <span class="mt-8 text-4xl font-semibold">Article author</span>
        <!-- team members -->
        <select
            class="border-accent/50 focus:ring-accent border bg-black px-5 py-4 text-white placeholder:text-white/50"
            name="author"
            id="author"
        >
            <option value="" disabled selected>Please select one</option>
            {#if loading}
                <p class="text-xl">Loading team members...</p>
            {:else if sortedMembers.length === 0}
                <p class="text-xl text-gray-400">No team members found!</p>
            {:else}
                <option value="TeamNetro">Team Netro</option>
                {#each sortedMembers as member}
                    <option value={member.username}>{member.realName}</option>
                {/each}
            {/if}
        </select>

        <span class="mt-8 text-4xl font-semibold">Article details</span>
        <Textbox rows="1" placeholder="Article title" />
        <Textbox rows="1" placeholder="Article description" />
        <span>Recommended categories: announcement, news, blog. You may add a new category at any time and it will show up here.</span>
        <span class="font-sans text-lg font-light text-white/75">Categories in use: {blogArticles[0]?.categories.join(', ')}</span>
        <Textbox rows="1" placeholder="Article categories (aka, tags). Can be seperated with commas, no spaces. (Required)" />
        <div class="flex w-full flex-col gap-6">
            <p class="max-w-90">Attach your article image. Please include an image (.jpg, .jpeg, .png). (Optional)</p>
            <span><span class="text-accent font-bold underline underline-offset-5">Choose files</span>. No files chosen</span>
        </div>

        <span class="mt-8 text-4xl font-semibold">Article content</span>
        <!-- idk man -->
        <div class="grid grid-cols-1">
            <div class="flex-1">
                <Textbox rows="20" class="h-full w-full" placeholder="Type here (Markdown supported)" />
            </div>
        </div>

        <span class="mt-8 text-4xl font-semibold">Published?</span>
        <select
            class="border-accent/50 focus:ring-accent border bg-black px-5 py-4 text-white placeholder:text-white/50"
            name="author"
            id="author"
        >
            <option value="" disabled selected>Please select one</option>
            <option value="pub_true">Published</option>
            <option value="pub_false">Draft</option>
        </select>

        <!-- wip delete article button, only show if editing an existing article -->
        <ButtonSimple href="/blog" class="mt-6 ml-auto" text="Delete Article" />
    </div>
</div>
