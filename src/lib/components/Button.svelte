<script lang="ts">
    let { class: className = '', href = '#', text = 'add message', loading = false, type = 'button', form = '', ...rest } = $props();
</script>

{#if type === 'submit' || type === 'reset'}
    <button
        {type}
        {form}
        class={`bg-offaccent group button flex items-center gap-4 self-end rounded-full px-8 py-3 text-xl text-white shadow-xl/6 transition-all ease-in-out hover:cursor-pointer hover:bg-black ${className}`}
        {...rest}
    >
        {text}
    </button>
{:else}
    <a
        {href}
        class={`bg-offaccent group button flex items-center gap-4 self-end rounded-full px-8 py-3 text-xl text-white shadow-xl/6 transition-all ease-in-out hover:cursor-pointer hover:bg-black ${className}`}
        {...rest}
    >
        {text}
    </a>
{/if}
