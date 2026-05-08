<script lang="ts">
    import type { HTMLAnchorAttributes } from 'svelte/elements';

    let { class: className = '', href = '#', text = 'add message', ...rest }: HTMLAnchorAttributes & { text?: string } = $props();
</script>

<a {href} class={['group relative flex flex-row items-center gap-4 transition-all', className]} {...rest}>
    <span class="relative z-10 inline-flex w-max flex-nowrap items-center gap-4">
        <span class="transform whitespace-nowrap transition-all duration-300 group-hover:tracking-[10%]">
            {text}
        </span>
        <span
            class="group-hover:border-accent absolute -inset-2 -z-10 border-2
                   border-white/0 transition-all duration-300
                   ease-in-out group-hover:bg-black"
        >
        </span>
        <img src="/images/arrow-default.png" alt="arrow pointing right" class="shrink-0 transition-all duration-800 group-hover:pl-2" />
    </span>
</a>
