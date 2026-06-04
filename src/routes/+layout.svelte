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
<!-- pretty hard coded for the header but yeah. negative values work best -->
<main class="3xl:mx-auto mx-5 -mt-32.5 mb-32.5 flex max-w-560 flex-col font-sans xl:mx-70">
    {@render children()}
</main>
<Footer />
{#if dev}
    <DevBanner />
{/if}
