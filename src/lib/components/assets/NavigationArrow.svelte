<script lang="ts">
    let { href, styles, text }: { href: string; text: string; styles?: string | null } = $props();
</script>

<a
    {href}
    class={`text-accent group flex w-fit items-center gap-2 text-3xl font-bold ${styles} transition-all ease-in-out hover:text-black`}
>
    {text}
    <img
        src="/images/arrow-sorange.svg"
        alt="Arrow"
        class="w-7 -rotate-90 overflow-hidden transition-transform duration-200 group-hover:translate-x-2"
        loading="lazy"
    />
</a>
