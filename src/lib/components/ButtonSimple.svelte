<script lang="ts">
    let { class: className = '', href = '#', text = 'add message', ...rest } = $props();
</script>

<a {href} class={`flex flex-row items-center gap-4 hover:opacity-70 ${className}`}>
    <span class="font-display uppercase">{text}</span>
    <img src="/images/arrow-default.png" alt="arrow pointing right" />
</a>
