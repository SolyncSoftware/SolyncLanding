<script>
    import OurPartners from '$lib/components/about/OurPartners.svelte';
    import OurTeam from '$lib/components/about/OurTeam.svelte';
</script>

<h1 class="text-5xl font-bold">About Us</h1>
<!-- may need to be shorten -->
<div class="flex max-w-200 flex-col gap-4 text-xl">
    <p>
        Netro is driven by simple principles: putting users first, challenging tradition with originality, and constantly improving. We
        don't sell out, make empty promises, or cut corners for profit. Our products and services are a direct reflection of that
        commitment.
    </p>
    <p>
        We iterate quickly and thoughtfully, refining what works and fixing what doesn't. Continuous growth means owning our impact and
        staying open to feedback.
    </p>
</div>

<div class="mt-24 flex max-w-301 flex-col gap-4 text-xl">
    <h1 class="text-5xl font-bold">Our Partners</h1>
    <OurPartners />
</div>

<div class="mt-24 flex max-w-301 flex-col gap-9 text-xl">
    <h1 class="text-5xl font-bold">Our Team</h1>
    <OurTeam />
</div>
