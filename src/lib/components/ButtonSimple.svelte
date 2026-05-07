<script lang="ts">
    let { class: className = '', href = '#', text = 'add message', ...rest } = $props();
</script>

<a {href} class={`group relative flex flex-row items-center gap-4 transition-all ${className}`} {...rest}>
    <span class="relative inline-flex items-center gap-4">
        <span class="absolute -inset-2 -z-10 transition-all duration-300 group-hover:bg-black"></span>

        <span class="relative">
            <span class="transform transition-all duration-300">{text}</span>
            <span class="absolute bottom-0 left-0 h-0.5 w-0 bg-white/30 transition-all duration-300 group-hover:w-full"></span>
        </span>
        <img src="/images/arrow-default.png" alt="arrow pointing right" class="transition-transform duration-900" />
    </span>
</a>
