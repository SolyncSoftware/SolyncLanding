<script lang="ts">
    let { class: className = '', href = '#', text = 'add message', loading = false, ...rest } = $props();
</script>

<a
    {href}
    class={`bg-accent font-display outline-accent flex items-center gap-4 self-end py-4 pr-4 pl-7 text-lg font-bold uppercase outline-2 -outline-offset-2 transition-all ease-in-out hover:outline-white ${className}`}
    {...rest}
>
    {#if !loading}
        {text}
        <img src="/images/arrow-default.png" alt="arrow pointing right" />
    {:else}
        <img src="/images/loading-spinner.svg" class="size-8" alt="loading spinner" />
    {/if}
</a>
