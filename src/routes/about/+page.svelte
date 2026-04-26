<script>
    import OurPartners from '$lib/components/about/OurPartners.svelte';
    import OurTeam from '$lib/components/about/OurTeam.svelte';
</script>

<h1 class="text-5xl font-bold">About Us</h1>
<div class="mt-6 flex max-w-200 flex-col gap-4 text-xl">
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
    <p class="text-lg">The partner program is currently closed but we will reopen applications eventually.</p>
    <OurPartners />
</div>

<div class="mt-24 flex max-w-301 flex-col gap-4 text-xl">
    <h1 class="text-5xl font-bold">Our Team</h1>
    <p class="text-lg">
        Our company is flat by design! There are no bosses and we priortize collectivism, empathy, trust, and mutual respect.
    </p>
    <OurTeam />
</div>
