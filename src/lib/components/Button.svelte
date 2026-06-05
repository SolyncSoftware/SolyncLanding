<script lang="ts">
    let { class: className = '', href = '#', text = 'add message', loading = false, ...rest } = $props();
</script>

<a
    {href}
    class={`bg-offaccent group flex items-center gap-4 self-end rounded-full px-8 py-3 text-xl text-white transition-all ease-in-out hover:bg-black ${className}`}
    {...rest}
>
    {text}
</a>
