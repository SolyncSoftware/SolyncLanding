<script lang="ts">
    import OurPartners from '$lib/components/about/OurPartners.svelte';
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    // const title: string = 'Solync';
    // const description: string = `
    // is a software collective driven by simple principles: putting users first, challenging tradition
    // with originality, and constantly improving. We don't sell out, make empty promises, or cut corners for profit. What we create is a direct
    // reflection of that commitment.
    // We iterate quickly and thoughtfully, refining what works and fixing what doesn't. Continuous growth means owning our impact and
    // staying open to radical feedback, ensuring we meet our own standards.
    // `;
</script>

<section class="flex flex-col gap-14">
    <PageContainer>
        <div class="flex max-h-128 flex-col justify-between xl:flex-row xl:pr-24">
            <div class="max-w-210 font-medium">
                <h1 class="text-4xl font-bold md:text-6xl">About Solync</h1>
                <p class="mt-4 text-lg md:text-2xl">
                    <span class="text-3xl"><strong>Solync</strong></span> is a software collective driven by simple principles: putting users
                    first, challenging tradition with originality, and constantly improving. We don't sell out, make empty promises, or cut corners
                    for profit. What we create is a direct reflection of that commitment.
                </p>
                <p class="mt-4 text-lg md:text-2xl">
                    We iterate quickly and thoughtfully, refining what works and fixing what doesn't. Continuous growth means owning our
                    impact and staying open to radical feedback, ensuring we meet our own standards.
                </p>
            </div>
        </div>
    </PageContainer>

    <div>
        <h2 class="text-accent text-5xl font-bold">Our Partners</h2>
        <p class="text-lg opacity-90">
            By partnering with Solync, we share resources, talent, and expertise to create cool stuff. We collaborate on projects, exchange
            ideas, and support one another.
        </p>
        <p class="mb-4 text-lg opacity-90">The partner program is currently closed, but we will reopen applications in the near future.</p>
        <OurPartners />
    </div>
</section>
