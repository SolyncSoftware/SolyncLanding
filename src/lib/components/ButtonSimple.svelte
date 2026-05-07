<script lang="ts">
    let { class: className = '', href = '#', text = 'add message', ...rest } = $props();
</script>

<a {href} class={`group relative flex flex-row items-center gap-4 transition-all ${className}`} {...rest}>
    <span class="relative z-100 inline-flex items-center gap-4">
        <span
            class="group-hover:outline-accent absolute -inset-2 -z-10 outline-2
                   outline-white/0 transition-all duration-300
                   ease-in-out group-hover:bg-black group-hover:outline-2"
        ></span>

        <span class="relative">
            <span class="transform transition-all duration-300">{text}</span>
        </span>

        <img src="/images/arrow-default.png" alt="arrow pointing right" class="transition-transform duration-900" />
    </span>
</a>
