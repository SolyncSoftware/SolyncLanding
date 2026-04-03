<script>
    let { children } = $props();
    import '../styles/tailwind.css';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import DevBanner from '$lib/components/DevBanner.svelte';

    import { afterNavigate } from '$app/navigation';
    import { onMount } from 'svelte';
    import Waves from '$lib/components/assets/Waves.svelte';

    function initUnicorn() {
        UnicornStudio.init().catch(console.error);
    }

    onMount(initUnicorn);
    afterNavigate(initUnicorn);
</script>

<Header />
<main class="font-display flex flex-col gap-5 px-21 py-16">
    <!-- im not sure if tanza wanted the position fixed or absolute -->
    <div class="absolute top-0 left-0 -z-10 w-full">
        <Waves style="height: 100vh;" wavesType="/netro_waves_dark.json" />
    </div>
    {@render children()}
</main>
<Footer />
<DevBanner />
