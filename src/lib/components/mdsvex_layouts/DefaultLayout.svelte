<!--
    Default fallback layout used for legal articles and articles without a specific layout.
-->

<script lang="ts">
    import type { Article } from '$lib/utils/types.js';
    import type { Snippet } from 'svelte';

    const { title, date, children }: Article & { children: Snippet } = $props();
</script>

<h1 class="text-5xl font-bold text-white first-letter:uppercase">{title}</h1>
<article class="border-t-accent h-auto rounded-4xl border-t-11 bg-white p-9 text-2xl shadow-xl/6">
    <span class="font-sans text-2xl">
        <p class="text-accent font-bold">Last updated on {date}</p>

        <div class="markdown">
            {@render children()}
        </div>
    </span>
</article>

<style>
    .markdown :global(h2) {
        font-family: var(--font-display);
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        font-size: 1.875rem;
        line-height: 2.25rem;
        font-weight: 700;
        text-transform: uppercase;
    }

    .markdown :global(p) {
        margin-bottom: 0.5rem;
    }

    .markdown :global(ul) {
        margin-bottom: 0.5rem;
        margin-left: 1.5rem;
        list-style-type: disc;
    }
</style>
