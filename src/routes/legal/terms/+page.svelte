<script lang="ts">
    let { data } = $props();
</script>

<p class="text-accent">Last revised {data.revised}</p>

<div class="markdown">
    {@html data.html}
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
