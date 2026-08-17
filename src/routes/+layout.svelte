<script lang="ts">
    import { dev } from '$app/environment';
    import DevBanner from '$lib/components/DevBanner.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Header from '$lib/components/Header.svelte';
    import Waves from '$lib/components/assets/Waves.svelte';
    import persistentWaveStore from '$lib/stores/persistentWave.js';
    import { onMount, type Snippet } from 'svelte';
    import { page } from '$app/state';
    import { fade } from 'svelte/transition';
    import { quartInOut, sineInOut } from 'svelte/easing';
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

    let meta = $derived(page.data?.meta ?? {});
    const DEFAULT_TITLE = 'Solync / Building what comes next, together.';
    const DEFAULT_DESC =
        "Solync is a worker-owned organization building what's next. Join us on our journey to create something awesome together.";
    const DEFAULT_IMAGE = '/images/banner.png';
</script>

<svelte:head>
    <title>{`${meta.title ?? DEFAULT_TITLE}`}</title>
    <meta name="description" content={meta.description ?? DEFAULT_DESC} />

    <meta property="og:title" content={meta.title ?? DEFAULT_TITLE} />
    <meta property="og:description" content={meta.description ?? DEFAULT_DESC} />
    <meta property="og:image" content={meta.image ?? DEFAULT_IMAGE} />
    <meta property="og:type" content={meta.type ?? 'website'} />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={meta.title ?? DEFAULT_TITLE} />
    <meta name="twitter:description" content={meta.description ?? DEFAULT_DESC} />
    <meta name="twitter:image" content={meta.image ?? DEFAULT_IMAGE} />
</svelte:head>

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
{#key page.url.pathname}
    <main
        class="3xl:mx-auto mx-5 -mt-32.5 mb-32.5 flex max-w-560 flex-col font-sans 2xl:mx-70"
        in:fade={{ duration: 300, delay: 400 }}
        out:fade={{ duration: 300 }}
    >
        {@render children()}
    </main>
{/key}
<Footer />
{#if dev}
    <DevBanner />
{/if}
