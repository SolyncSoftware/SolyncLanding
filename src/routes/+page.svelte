<script>
    import HomeWaves from '$lib/components/index/HomeWaves.svelte';
    import WeAreNetro from '$lib/components/index/WeAreNetro.svelte';
    import WhatWeDo from '$lib/components/index/WhatWeDo.svelte';
</script>

<HomeWaves />

<div class="flex flex-col gap-60">
    <WeAreNetro />

    <WhatWeDo />

    <!-- content block template -->
    <section class="bg-error/30 relative">
        <div class="absolute inset-0 bg-cover bg-bottom bg-no-repeat"></div>
        <div class="relative z-10 flex h-full items-center justify-center">content block template</div>
    </section>
</div>
