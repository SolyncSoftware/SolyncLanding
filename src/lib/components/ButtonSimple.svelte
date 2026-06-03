<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';

    let { class: className = '', href = '#', text = 'add message', ...rest }: HTMLAnchorAttributes & { text?: string } = $props();
</script>

<a
    {href}
    class={`text-accent active:font-display flex items-center text-xl transition-all ease-in-out hover:text-black ${className}`}
    {...rest}
>
    {text}
</a>
