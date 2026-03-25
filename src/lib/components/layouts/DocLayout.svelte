<script>
    import Waves from '$lib/components/assets/Waves.svelte';
    export let title = '';
</script>

<section class="-mx-16 grid min-h-screen">
    <div class="col-start-1 row-start-1 h-full w-full">
        <Waves style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -110;" wavesType="/netro_waves_dark.json" />
    </div>
    <div class="z-10 col-start-1 row-start-1 flex flex-col items-start gap-12 p-21">
        <!-- page content -->
        <h1 class="font-display text-5xl leading-16.5 font-bold">{title}</h1>
        <div class="border-t-accent h-auto w-301 border-t-11 bg-black p-6">
            <span class="font-sans text-2xl">
                <slot />
            </span>
        </div>
    </div>
</section>
