<script lang="ts">
    // import waves from '../../../../static/waves.png';
    // import arrow from '../../../../static/arrow-default.png';
</script>

<section class="relative -mx-16 flex h-screen items-start">
    <!-- <div class="absolute inset-0 -z-100 bg-cover bg-bottom bg-no-repeat" style="background-image: url(/waves.png);"></div> -->
    <div
        class="unicorn-embed"
        data-us-project-src="/netro_waves_dark.json"
        data-us-lazyload="true"
        data-us-scale="0.8"
        style="width: 100%; height: 100vh; image: url(/waves.png);"
    ></div>

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

        <a href="/apply" class="flex flex-row items-center gap-4 hover:opacity-70">
            <span class="font-display">READ MORE</span>
            <img src="/arrow-default.png" alt="arrow pointing down" />
        </a>
    </div>
</section>
