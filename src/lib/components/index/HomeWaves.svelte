<script lang="ts">
    // import waves from '../../../../static/waves.png';
    // import arrow from '../../../../static/arrow-default.png';
    import Waves from '$lib/components/assets/Waves.svelte';
</script>

<section class="relative -mx-16 flex h-screen items-start">
    <!-- <div class="absolute inset-0 -z-100 bg-cover bg-bottom bg-no-repeat" style="background-image: url(/waves.png);"></div> -->
    <Waves style="height: 100vh;" wavesType="/netro_waves_dark.json" />

    <!-- container inside the waves section -->
    <div class="absolute z-10 flex w-full flex-col items-start gap-12 p-21 text-xl">
        <img src="/logo-blue.svg" alt="netro logo" width="540" height="118" />

        <span class="font-display max-w-194">
            <p>We create software, NetroHost, Gardens Wiki, and more.</p>
            <br />
            <p>
                We're a small software collective creating what we love. It's not only because we want to, we need to. We collaborate to
                create what's next.
            </p>
        </span>

        <!-- todo: maybe more dynamic but wait for tanza -->
        <div class="flex flex-row items-start gap-8">
            <a href="/about" class="flex flex-row items-center gap-4 hover:opacity-70">
                <span class="font-display">LEARN MORE</span>
                <img src="/arrow-default.png" alt="arrow pointing down" />
            </a>

            <a href="/apply" class="flex flex-row items-center gap-4 hover:opacity-70">
                <span class="font-display">JOIN US</span>
                <img src="/arrow-default.png" alt="arrow pointing down" />
            </a>
        </div>
    </div>

    <!-- news section -->
    <div class="flex h-screen max-w-100 flex-col items-end gap-6 bg-black/75 pt-26 pr-18">
        <span class="font-display text-5xl font-bold">News</span>

        <!-- news card -->
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

        <a href="/news" class="flex flex-row items-center gap-4 hover:opacity-70">
            <span class="font-display">READ MORE</span>
            <img src="/arrow-default.png" alt="arrow pointing down" />
        </a>
    </div>

    <div class="absolute bottom-21 left-24 grid grid-cols-2 gap-8">
        <a href="/test" class="relative">
            <img src="/placeholder.svg" alt="placeholder" class="h-40 max-w-134 object-cover" />
            <span
                class="font-display bg-accent absolute top-0 left-0 -translate-x-3 -translate-y-4 py-1.5 pr-20 pl-2.5 text-3xl font-bold text-black"
            >
                NETROHOST
            </span>
        </a>

        <a href="/test" class="relative">
            <img src="/placeholder.svg" alt="placeholder" class="h-40 max-w-134 object-cover" />
            <span
                class="font-display bg-accent absolute top-0 left-0 -translate-x-3 -translate-y-4 py-1.5 pr-20 pl-2.5 text-3xl font-bold text-black"
            >
                GAYGAYGAY
            </span>
        </a>
    </div>
</section>
