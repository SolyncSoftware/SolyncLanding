<script lang="ts">
    let { data } = $props();
</script>

<div class="border-t-accent mt-6 h-auto w-301 border-t-11 bg-black p-8">
    <span class="font-sans text-2xl">
        <p class="text-accent">Written/Revised on {data.meta.date}</p>

        <div class="markdown">
            <data.content />
        </div>
    </span>
</div>

<style>
    .markdown :global(h2) {
        font-family: var(--font-display);
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
