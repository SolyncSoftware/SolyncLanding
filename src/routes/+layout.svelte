<script lang="ts">
    import { dev } from '$app/environment';
    import DevBanner from '$lib/components/DevBanner.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Header from '$lib/components/Header.svelte';
    import Waves from '$lib/components/assets/Waves.svelte';
    import persistentWaveStore from '$lib/stores/persistentWave.js';
    import { onMount, type Snippet } from 'svelte';
    import '../styles/tailwind.css';

    let { children }: { children: Snippet } = $props();

    import runGlobalPerformanceCheck from '$lib/utils/performanceCheck.js';

    let hostEl = $state<HTMLDivElement | null>(null);

    $effect(() => {
        if (hostEl) persistentWaveStore.setHost(hostEl);
    });

    onMount(() => {
        runGlobalPerformanceCheck().catch(console.error);
    });
</script>

<div bind:this={hostEl} class="pointer-events-none hidden" aria-hidden="true">
    <Waves
        className="h-full overflow-hidden mix-blend-plus-lighter"
        style="z-index: -1; overflow: hidden; mask-image: linear-gradient(to right, #fff6 20%, #fffa, #fff);"
        wavesType="/solync_waves_dark.json"
        backgroundImage="/images/waves-dark.png"
        backgroundSize="cover"
    />
</div>

<Header />
<!-- pretty hard coded for the header but yeah. negative values work best -->
<main class="3xl:mx-auto mx-5 -mt-32.5 mb-32.5 flex max-w-560 flex-col font-sans 2xl:mx-70">
    {@render children()}
</main>
<Footer />
{#if dev}
    <DevBanner />
{/if}
