<script lang="ts">
    let { children } = $props() as any;
    import '../styles/tailwind.css';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import DevBanner from '$lib/components/DevBanner.svelte';

    import { page } from '$app/state';
    import { afterNavigate } from '$app/navigation';
    import { onMount } from 'svelte';
    import Waves from '$lib/components/assets/Waves.svelte';

    function initUnicorn() {
        UnicornStudio.init().catch(console.error);
    }

    onMount(initUnicorn);
    afterNavigate(initUnicorn);
</script>

{#if !page?.data?.hideHeader}
    <Header />
{/if}
<main class="font-display flex flex-col px-21 py-16">
    <div class="fixed top-0 left-0 -z-10 w-full">
        <Waves style="height: 100vh;" wavesType="/netro_waves_dark.json" />
    </div>
    <h1 class="text-5xl font-bold">{page?.data?.title}</h1>
    {@render children()}
</main>
<Footer />
<DevBanner />
