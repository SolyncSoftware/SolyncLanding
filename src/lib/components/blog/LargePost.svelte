<script lang="ts">
    // export let title: string;
    // export let description: string;
</script>

<div class="font-display border-accent relative border-b-12 bg-black/75">
    <img loading="lazy" src="/images/placeholder.svg" alt="screenshot of news post" class="h-56 w-full object-cover" />
    <div class="bg-accent absolute ml-8 -translate-y-6 justify-self-start px-2 py-1 text-xl font-bold text-black">ANNOUNCEMENT</div>
    <div class="flex flex-row justify-between p-8">
        <div class="flex max-w-190 flex-col">
            <div class="text-accent text-3xl font-bold">AWESOME NEWS POST TITLE</div>
            <p class="text-xl">
                Small description about this news post and what it is, spaghetti hoops - can be many paragraphs and probably 3 lines but it
                can be longer if you want
            </p>
        </div>
        <a href="/putarticlehereorsomething" class="flex flex-row items-center gap-4 self-end hover:opacity-70">
            <span class="font-display text-lg">READ MORE</span>
            <img src="/images/arrow-default.png" alt="arrow pointing down" />
        </a>
    </div>
</div>
