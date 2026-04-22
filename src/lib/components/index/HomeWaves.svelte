<script lang="ts">
    import NetroGlobe from '../assets/NetroGlobe.svelte';
</script>

<section class="relative -my-16 -mr-21 grid min-h-screen grid-cols-[1fr_410px] grid-rows-[auto_auto]">
    <div class="pointer-events-none absolute inset-0 overflow-x-hidden">
        <NetroGlobe
            style="position: absolute !important; 
                   width: 1400px !important; 
                   height: 1400px !important; 
                   object-position: bottom right !important; 
                   mix-blend-mode: screen; 
                   transform: translate(47%, 0%);"
        />
    </div>
    <div class="transform-0 col-start-1 row-start-1 flex flex-col items-start gap-12">
        <div class="pt-21">
            <a href="/">
                <img src="/logo-blue.svg" alt="netro logo" width="540" height="118" />
            </a>
        </div>
        <span class="font-display max-w-194 text-[22px]">
            <p>We create software, NetroHost, Gardens Wiki, and more.</p>
            <br />
            <p>
                We're a small software collective creating what we love. It's not only because we want to, we need to. We collaborate to
                create what's next.
            </p>
        </span>
        <div class="flex flex-row items-start gap-8">
            <a href="/about" class="flex flex-row items-center gap-4 hover:opacity-70">
                <span class="font-display text-[23px]">LEARN MORE</span>
                <img src="/arrow-default.png" alt="arrow pointing down" />
            </a>

            <a href="/apply" class="flex flex-row items-center gap-4 hover:opacity-70">
                <span class="font-display text-[23px]">JOIN US</span>
                <img src="/arrow-default.png" alt="arrow pointing down" />
            </a>
        </div>
    </div>

    <div class="col-start-1 row-start-2 flex gap-8">
        <a href="/test" class="relative">
            <img src="/placeholder.svg" alt="placeholder" class="h-40 max-w-134 object-cover" />
            <span
                class="font-display bg-accent absolute top-0 left-0 -translate-x-3 -translate-y-4 py-1.5 pr-20 pl-2.5 text-3xl font-bold text-black"
            >
                NETROHOST
            </span>
        </a>

        <a href="/test" class="relative">
            <img src="/placeholder2.svg" alt="placeholder" class="h-40 max-w-134 object-cover" />
            <span
                class="font-display bg-accent absolute top-0 left-0 -translate-x-3 -translate-y-4 py-1.5 pr-20 pl-2.5 text-3xl font-bold text-black"
            >
                GARDENS WIKI
            </span>
        </a>
    </div>

    <aside class="z-5 col-start-2 row-span-2 row-start-1 flex h-full flex-col items-center bg-black/60 py-18 text-white">
        <h2 class="mb-8 ml-40 text-4xl font-bold tracking-widest">NEWS</h2>
        <div class="-ml-[15%] flex flex-col gap-6">
            <div class="font-display w-100 bg-black/75 text-right">
                <img loading="lazy" src="/placeholder2.svg" alt="screenshot of news post" class="h-56 w-full object-cover" />
                <div class="bg-accent absolute -translate-x-2 -translate-y-6 justify-self-end px-2 py-1 text-xl font-bold text-black">
                    ANNOUNCEMENT
                </div>
                <div class="text-accent border-accent border-b-12 px-6 py-4 text-2xl font-bold">AWESOME NEWS POST TITLE</div>
            </div>

            <div class="font-display w-100 bg-black/75 text-right">
                <img loading="lazy" src="/placeholder2.svg" alt="screenshot of news post" class="h-56 w-full object-cover" />
                <div class="bg-accent absolute -translate-x-2 -translate-y-6 justify-self-end px-2 py-1 text-xl font-bold text-black">
                    ANNOUNCEMENT
                </div>
                <div class="text-accent border-accent border-b-12 px-6 py-4 text-2xl font-bold">AWESOME NEWS POST TITLE</div>
            </div>
        </div>
        <a href="/news" class="flex flex-row items-center gap-4 pt-8 pl-22 hover:opacity-70">
            <span class="font-display text-[22px]">READ MORE</span>
            <img src="/arrow-default.png" alt="arrow pointing down" />
        </a>
    </aside>
</section>
