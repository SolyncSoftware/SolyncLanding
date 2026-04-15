<script>
    let { children } = $props();
    import '../styles/tailwind.css';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import DevBanner from '$lib/components/DevBanner.svelte';

    import { afterNavigate } from '$app/navigation';
    import { onMount } from 'svelte';
    import { page } from '$app/state';
    import Waves from '$lib/components/assets/Waves.svelte';

    function initUnicorn() {
        UnicornStudio.init().catch(console.error);
    }

    onMount(initUnicorn);
    afterNavigate(initUnicorn);

    const title = $derived(page.data.title);
</script>

<Header />
<main class="font-display flex flex-col gap-5 px-21 py-16">
    <div class="fixed top-0 left-0 -z-10 w-full">
        <Waves style="height: 100vh;" wavesType="/netro_waves_dark.json" />
    </div>
    <h1 class="text-5xl font-bold">{title}</h1>
    {@render children()}
</main>
<Footer />
<DevBanner />
