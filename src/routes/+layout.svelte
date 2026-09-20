<script lang="ts">
    import { dev } from '$app/environment';
    import DevBanner from '$lib/components/DevBanner.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Header from '$lib/components/Header.svelte';
    import Waves from '$lib/components/assets/Waves.svelte';
    import persistentWaveStore from '$lib/stores/persistentWave.js';
    import AnimatedIntroLogo from '$lib/components/AnimatedIntroLogo.svelte';
    import { onMount, type Snippet } from 'svelte';
    import { page } from '$app/state';
    import { fade } from 'svelte/transition';
    import { tick } from 'svelte';
    import 'rune-scroller/animations.css';
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

    const absoluteHeaderPaths = ['/', '/about'];

    let headerMode = $derived(absoluteHeaderPaths.includes(page.url.pathname) ? 'overlay' : 'solid');
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
        style="z-index: -1; overflow: hidden;"
        wavesType="/solync_waves_dark.json"
        backgroundImage="/images/waves-dark.png"
        backgroundSize="cover"
    />
    <!-- style= "... mask-image: linear-gradient(to right, #fff6 20%, #fffa, #fff);" -->
</div>

<Header mode={headerMode} />
<AnimatedIntroLogo />
<div class="progress-bar"></div>
<!-- pretty hard coded for the header but yeah. negative values work best -->
{#key page.url.pathname}
    <main
        class={`flex max-w-560 flex-col pt-0 font-sans
        lg:pt-36
        ${headerMode === 'solid' ? 'pt-24' : ''}
        `}
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
