<script lang="ts">
    // import waves from '../../../../static/waves.png';
    // import arrow from '../../../../static/arrow-default.png';
</script>

<section class="relative -mx-16 flex h-screen items-end">
    <!-- <div class="absolute inset-0 bg-cover bg-bottom bg-no-repeat" style="background-image: url(/waves.png);"></div> -->
    <div
        class="unicorn-embed"
        data-us-project-src="/netro_waves.json"
        data-us-lazyload="true"
        style="width: 100%; height: 100vh; image: url(/waves.png);"
    ></div>

    <div class="absolute z-10 flex w-full items-end justify-between px-16.5 py-19">
        <div class="bg-black p-11">
            <img src="/logo-blue.svg" alt="netro logo" />
        </div>

        <div class="flex animate-bounce flex-row items-center gap-4 bg-black pl-35.5">
            <span class="font-display">SCROLL</span>
            <img src="/arrow-default.png" alt="arrow pointing down" />
        </div>
    </div>
</section>
