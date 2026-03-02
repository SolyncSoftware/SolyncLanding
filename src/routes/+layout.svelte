<script>
    let { children } = $props();
    import '../styles/tailwind.css';
    import Header from '$lib/components/Header.svelte';
    import Footer from '$lib/components/Footer.svelte';
    import DevBanner from '$lib/components/DevBanner.svelte';
</script>

<Header />
<main class="px-16.5">
    {@render children()}
</main>
<Footer />
<DevBanner />
