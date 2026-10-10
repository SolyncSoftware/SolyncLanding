<script lang="ts">
    let {
        class: className = '',
        href = '#',
        text = 'add message',
        children,
        loading = false,
        type = 'button',
        form = '',
        disabled = false,
        ...rest
    } = $props();
</script>

{#if type === 'submit' || type === 'reset'}
    <button
        {type}
        {form}
        {disabled}
        class={`bg-offaccent group button flex
        items-center gap-4 self-end rounded-full
        px-8 py-3 text-xl text-white shadow-xl/6
        transition-all ease-in-out hover:cursor-pointer
        hover:bg-black disabled:opacity-50
        ${className}`}
        {...rest}
    >
        {#if children}
            {@render children()}
        {:else}
            {text}
        {/if}
    </button>
{:else}
    <a
        {href}
        class={`bg-offaccent group button flex
        items-center gap-4 self-end rounded-full
        px-8 py-3 text-xl text-white shadow-xl/6
        transition-all ease-in-out hover:cursor-pointer
        hover:bg-black disabled:opacity-50
        ${className}`}
        {...rest}
    >
        {#if children}
            {@render children()}
        {:else}
            {text}
        {/if}
    </a>
{/if}
