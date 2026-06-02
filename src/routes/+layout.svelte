<script lang="ts">
    import { dev } from '$app/environment';
    import DevBanner from '$lib/components/DevBanner.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import Header from '$lib/components/Header.svelte';
    import { onMount, type Snippet } from 'svelte';
    import '../styles/tailwind.css';

    let { children }: { children: Snippet } = $props();

    import runGlobalPerformanceCheck from '$lib/utils/performanceCheck.js';

    onMount(() => {
        runGlobalPerformanceCheck().catch(console.error);
    });
</script>

<Header />
<main class="font-display 3xl:mx-auto flex max-w-560 flex-col px-5 py-10 lg:px-21 lg:py-16">
    {@render children()}
</main>
<Footer />
{#if dev}
    <DevBanner />
{/if}
