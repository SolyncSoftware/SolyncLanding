<script lang="ts">
    import { page } from '$app/state';
    let { data, children } = $props();
    // if a child layout handles rendering, skip
    const isLegal = page.route.id?.startsWith('/(md)/legal');
</script>

{#if isLegal}
    {@render children?.()}
{:else}
    <article class="markdown">{@html data.html}</article>
{/if}
