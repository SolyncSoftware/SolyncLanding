<script>
    export let title;
    // export let author;
    // export let date;
    // export let categories;
    export let image;
</script>

<!-- <h1 class="text-5xl font-bold uppercase">{title}</h1>
<div class="border-t-accent mt-6 h-auto w-301 border-t-11 bg-black p-8">
    <span class="font-sans text-2xl">
        <p class="text-accent">Written/Revised on {date}</p>

        <p class="text-accent">By {author}</p>
        <p class="text-accent">Categories: {categories.join(', ')}</p>
        <img src={image || '/images/fallback.png'} alt="screenshot of news post" class="h-56 w-full object-cover" />
        <div class="markdown">
            <slot></slot>
        </div>
    </span>
</div> -->

<article>
    <img src={image || '/images/fallback.png'} alt="screenshot of news post" class="mb-16 h-94 w-full object-cover" />

    <div class="flex gap-8">
        <!-- todo: probably need to add a max-width -->
        <div class="markdown flex-2 font-sans text-2xl">
            <h1 class="font-display text-5xl font-bold uppercase">{title}</h1>
            <slot></slot>
        </div>
        <!-- todo: github api pfp, probably using author for username or real name. need category, need date -->
        <div class="bg-accent/20 flex-1">read todo notes</div>
    </div>

    <!-- todo: read more section. grab latest articles -->
</article>

<style>
    /* todo: proper markdown styling */
    .markdown :global(h2) {
        font-family: var(--font-sans);
        margin-top: 1.5rem;
        margin-bottom: 1.5rem;
        font-size: 1.875rem;
        line-height: 2.25rem;
        font-weight: 700;
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
