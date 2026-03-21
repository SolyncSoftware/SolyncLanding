<script>
    import HomeWaves from '$lib/components/index/HomeWaves.svelte';
    import OurPartners from '$lib/components/index/OurPartners.svelte';
    import WeAreNetro from '$lib/components/index/WeAreNetro.svelte';
    import WhatWeDo from '$lib/components/index/WhatWeDo.svelte';
    import WhoWeAre from '$lib/components/index/WhoWeAre.svelte';
</script>

<HomeWaves />

<div class="flex flex-col gap-20">
    <WeAreNetro />
    <WhatWeDo />
    <WhoWeAre />
    <OurPartners />
</div>
