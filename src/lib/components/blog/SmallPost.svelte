<script lang="ts">
    export let title;
    export let description;
    export let link;
    export let category;
    export let image;
</script>

<div class="font-display border-accent relative max-h-146 border-b-12 bg-black/75">
    <img loading="lazy" src={image || '/images/fallback.png'} alt="screenshot of news post" class="h-56 w-full object-cover" />
    <div class="bg-accent absolute ml-5 -translate-y-6 justify-self-start px-2 py-1 text-xl font-bold text-black uppercase">{category}</div>
    <div class="flex flex-col gap-6 p-6">
        <div class="flex max-w-134 flex-col">
            <div class="text-accent line-clamp-2 text-2xl font-bold uppercase">{title}</div>
            <p class="line-clamp-2 text-lg">{description}</p>
        </div>
        <a href={link} class="flex flex-row items-center gap-4 self-end hover:opacity-70">
            <span class="font-display text-lg">READ MORE</span>
            <img src="/images/arrow-default.png" alt="arrow pointing right" />
        </a>
    </div>
</div>
