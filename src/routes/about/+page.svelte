<script lang="ts">
    import OurPartners from '$lib/components/about/OurPartners.svelte';
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import OurProjects from '$lib/components/index/OurProjects.svelte';
    import SolyncLogo from '$lib/components/SolyncLogo.svelte';

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
        <div class="flex flex-col justify-between xl:flex-row xl:pr-24">
            <div class="max-w-210 font-medium">
                <h1 class="max-w-190 text-4xl font-bold md:text-6xl">We're just getting started.</h1>

                <p class="mt-4 text-lg md:text-2xl">
                    Solync is an independent software collective driven by passion, curiosity, experimentation, and the belief that creation
                    is art.
                </p>

                <p class="mt-4 text-lg md:text-2xl">
                    We're a collective of hobbyists who believe in worker-managed software and create things we collectively believe in. We
                    build tools that spark our collective interest and address human needs. Every product we make is built with the end user
                    in mind.
                </p>
            </div>
        </div>
    </PageContainer>

    <div class="grid grid-cols-1 gap-4 text-lg md:grid-cols-2 lg:grid-cols-2">
        <div class="rounded-4xl bg-white p-9 shadow-xl/4">
            <h2 class="mb-4 text-3xl font-bold">What we build</h2>

            <p class="mb-4">
                We've created projects like <a
                    href="https://github.com/SolyncSoftware/porter-wiki-frontend"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-accent hover:underline">Porter Robinson Wiki</a
                >,
                <a href="https://gardens.wiki" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">Gardens Wiki</a
                >,
                <a
                    href="https://github.com/SolyncSoftware/KILLALLBOTS"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-accent hover:underline">KILLALLBOTS</a
                > and more.
            </p>
            <p class="mb-4">
                Our projects start as pitches from anyone in the collective. We iterate, refine, and collaborate until a project is
                something we're excited to ship. Sometimes we may scrap everything and start over, but that's part of the process!
            </p>
        </div>

        <div class="rounded-4xl bg-white p-9 shadow-xl/4">
            <h2 class="mb-4 text-3xl font-bold">How we work</h2>

            <p class="mb-4">
                Because of our flat organizational structure, we have the freedom to design, experiment, and learn from each other. We trust
                people to be creative, self-sufficient, and responsible.
            </p>
            <p class="mb-4">
                We <span class="font-bold">build</span> user-first experiences. Not just because we love it, but because it's ethical.
            </p>
        </div>
    </div>
    <div class="flex w-full flex-col items-center justify-center gap-4 text-4xl font-bold">
        <p>Think you'd be a good addition?</p>
        <a href="/apply" class="text-accent text-4xl font-bold hover:underline">Join us today!</a>
    </div>

    <div class="rounded-4xl bg-white p-9 shadow-xl/4">
        <h2 class="mb-4 text-4xl font-bold">Our partners</h2>
        <p class="mb-4 max-w-210 text-lg">
            By partnering with Solync, we share resources, talent, and expertise to create cool stuff. We collaborate on projects, exchange
            ideas, and support one another.
        </p>
        <p class="mb-4 max-w-210 text-lg">The partner program is currently closed, but we will reopen applications in the future.</p>
        <OurPartners />
    </div>

    <div class="rounded-4xl bg-white p-9 shadow-xl/4">
        <h2 class="mb-4 text-4xl font-bold" id="our-work">A collection of our work</h2>
        <p class="mb-4 max-w-210 text-lg">A collection of projects that we've created and maintained.</p>
        <OurProjects count={999} cols={3} />
    </div>

    <div class="flex w-full flex-col items-center justify-center gap-4 text-4xl font-bold">
        <p>Building what comes next, together.</p>
        <SolyncLogo iconOnly={true} class="fill-accent w-30" />
    </div>
</section>
