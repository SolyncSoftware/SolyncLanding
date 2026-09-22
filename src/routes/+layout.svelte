<script lang="ts">
    import { dev } from '$app/environment';
    import DevBanner from '$lib/components/DevBanner.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Header from '$lib/components/Header.svelte';
    import AnimatedIntroLogo from '$lib/components/AnimatedIntroLogo.svelte';
    import { type Snippet } from 'svelte';
    import { page } from '$app/state';
    import { fade } from 'svelte/transition';
    import { tick } from 'svelte';
    import 'rune-scroller/animations.css';
    import '../styles/tailwind.css';

    let { children }: { children: Snippet } = $props();

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


<Header />
<AnimatedIntroLogo />
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
