<script lang="ts">
    import { dev } from '$app/environment';
    import { page } from '$app/state';
    import DevBanner from '$lib/components/DevBanner.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Header from '$lib/components/Header.svelte';
    import Waves from '$lib/components/assets/Waves.svelte';
    import * as persistentWaves from '$lib/stores/persistentWave.js';
    import 'rune-scroller/animations.css';
    import { tick, type Snippet } from 'svelte';
    import { fade } from 'svelte/transition';
    import '../styles/tailwind.css';

    let { children }: { children: Snippet } = $props();

    let dottyLogoWavesHostEl = $state<HTMLDivElement | null>(null);
    let homepageCubesHostEl = $state<HTMLDivElement | null>(null);

    $effect(() => {
        if (dottyLogoWavesHostEl) {
            persistentWaves.setHost(persistentWaves.stores.dottyLogo, dottyLogoWavesHostEl);
        }
        if (homepageCubesHostEl) {
            persistentWaves.setHost(persistentWaves.stores.homepageCubes, homepageCubesHostEl);
        }
    });

    // fixes hashes not working
    async function handleIntroEnd() {
        const hash = page.url.hash;
        if (hash) {
            await tick();
            const el = document.querySelector(hash);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

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

<div bind:this={dottyLogoWavesHostEl} class="pointer-events-none opacity-0" aria-hidden="true">
    <Waves
        className="h-full overflow-hidden mix-blend-plus-lighter"
        style="z-index: -1; overflow: hidden; mask-image: linear-gradient(to right, #fff6 20%, #fffa, #fff);"
        wavesType="/solync_waves_dark.json"
        backgroundImage="/images/waves-dark.png"
        backgroundSize="cover"
        waveStore={persistentWaves.stores.dottyLogo}
        scale={0.8}
    />
</div>

<div bind:this={homepageCubesHostEl} class="pointer-events-none opacity-0" aria-hidden="true">
    <Waves
        className="h-full overflow-hidden mix-blend-plus-lighter"
        style="z-index: -1; overflow: hidden"
        wavesType="/solync_home.json"
        waveStore={persistentWaves.stores.homepageCubes}
    />
</div>

<Header />
<!-- <AnimatedIntroLogo /> -->
<div class="progress-bar"></div>
<!-- pretty hard coded for the header but yeah. negative values work best -->
{#key page.url.pathname}
    <main
        class="3xl:mx-auto mx-5 -mt-32.5 mb-32.5 flex max-w-560 flex-col font-sans 2xl:mx-70"
        in:fade={{ duration: 200, delay: 300 }}
        out:fade={{ duration: 200 }}
        onintroend={handleIntroEnd}
    >
        {@render children()}
    </main>
{/key}
<Footer />
{#if dev}
    <DevBanner />
{/if}
