<script lang="ts">
    import OurPartners from '$lib/components/about/OurPartners.svelte';
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import OurProjects from '$lib/components/index/OurProjects.svelte';
    import ButtonNew from '$lib/components/ButtonNew.svelte';
    import type { PageProps } from './$types.ts';
    import { stores as waveStores } from '$lib/stores/persistentWave.js';

    const { data }: PageProps = $props();
</script>

<section class="flex flex-col gap-14">
    <PageContainer className="bg-cyan-600" waveStore={waveStores.dottyLogo}>
        <div class="flex flex-col justify-between xl:flex-row xl:pr-24">
            <div class="max-w-200 space-y-4 font-medium">
                <h1 class="max-w-190 text-4xl font-black md:text-6xl">We're just getting started.</h1>

                <p class="text-2xl">
                    Solync is an independent software collective driven by passion, curiosity, experimentation, and the belief that creation
                    is art.
                </p>

                <p class="text-2xl">
                    We're a group of hobbyists who believe in worker-managed software and create things we collectively believe in. We build
                    tools that spark our curiosity and address human needs. Every product we make is built with the end user in mind.
                </p>
            </div>
        </div>
    </PageContainer>
    <div class="space-y-4">
        <div class="relative overflow-hidden rounded-4xl bg-white p-6 pt-8 text-xl shadow-xl/4 sm:p-11">
            <h2 class="text-accent mb-20 max-w-100 text-7xl leading-14 font-black"><span class="font-thin">What we</span> Build</h2>
            <div class="max-w-170 space-y-4 [&>p]:font-medium">
                <p>
                    We've created software like <a
                        href="https://github.com/SolyncSoftware/porter-wiki-frontend"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-accent hover:underline">Porter Robinson Wiki</a
                    >,
                    <a href="https://gardens.wiki" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline"
                        >Gardens Wiki</a
                    >,
                    <a
                        href="https://github.com/SolyncSoftware/KILLALLBOTS"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-accent hover:underline">KILLALLBOTS</a
                    >, and we're constantly building what's next.
                </p>
                <p>
                    Our projects start as pitches from anyone in the collective. We iterate, refine, and collaborate until a project is
                    something we're excited to ship. Sometimes we may scrap everything and start over, but that's part of the process!
                </p>
            </div>

            <img src="images/wrench-vector.svg" alt="building tools" class="absolute top-1/2 right-0 -translate-y-1/2" />
        </div>

        <div class="bg-accent relative flex flex-col items-end overflow-hidden rounded-4xl p-6 pt-8 text-right text-xl shadow-xl/4 sm:p-11">
            <h2 class="mb-20 max-w-100 text-7xl leading-14 font-black text-white"><span class="font-thin">How we</span> Work</h2>

            <div class="max-w-170 space-y-4 [&>p]:font-medium">
                <p>
                    Because of our <a
                        href="https://en.wikipedia.org/wiki/Flat_organization"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-white hover:underline">flat organizational structure</a
                    >, we have the freedom to design, experiment, and learn from each other. We trust people to be creative,
                    self-sufficient, and responsible.
                </p>
                <p>
                    We <span class="font-bold">build</span> user-first experiences. Not just because we love it, but because it's ethical.
                </p>
            </div>

            <img src="images/people-vector.svg" alt="building tools" class="absolute top-1/2 left-0 -translate-y-1/2" />
        </div>
    </div>
    <p class="w-full text-center text-6xl font-thin">And how <span class="text-accent font-black">you</span> can help us;</p>

    <div class="grid gap-4 text-xl sm:grid-cols-2">
        <a
            href="/apply"
            class="relative space-y-4 rounded-4xl bg-emerald-600 p-6 text-white
         shadow-xl/4 transition-all hover:-translate-y-1 hover:shadow-[0_5px_0px_#00000022]
         sm:p-8
         "
        >
            <h2 class="text-5xl font-black">Join us!</h2>
            <p class="max-w-100 font-medium">
                Good with programming? Find yourself a bit of an artist? Love some triangles? We're worker-owned, flexible, and
                experimental. Submit your application to join Solync!
            </p>

            <img src="/images/circle-icon.svg" alt="circle icon" class="absolute right-4 bottom-4 w-14" />
        </a>

        <a
            href="/donate"
            class="relative space-y-4 rounded-4xl bg-pink-500/90
         p-6 text-white shadow-xl/4 transition-all hover:-translate-y-1 hover:shadow-[0_5px_0px_#00000022]
         sm:p-8"
        >
            <h2 class="text-5xl font-black">Support Solync</h2>
            <p class="max-w-100 font-medium">
                We're a collective of thinkers who like to showcase our work while staying ethical to the end user. If you send us money,
                you'll help us scale and build a better Solync.
            </p>

            <img src="/images/circle-icon.svg" alt="circle icon" class="absolute right-0 bottom-0 w-14 -translate-x-4 -translate-y-4" />
        </a>
    </div>

    <hr class="border-accent -mx-12 rounded-full border-t-4" />

    <div class="-ml-12 flex gap-12">
        <div class="bg-accent relative mt-15 w-2 shrink-0 rounded-full">
            <span class="bg-accent absolute -top-11 -left-4 h-10 w-10 rounded-full"></span>
        </div>

        <div class="flex-1 space-y-4">
            <h2 class="text-accent mb-8 text-7xl font-black">Our Partners</h2>
            <OurPartners />
            <p class="mt-8 max-w-160 text-xl">
                When partnering with Solync, we share resources, talent, and expertise to create cool stuff. We collaborate on projects,
                exchange ideas, and support one another.
            </p>
            <p class="max-w-160 text-xl">The partner program is currently closed, but we will reopen applications in the future.</p>
        </div>
    </div>

    <div class="-ml-12 flex gap-12">
        <div class="bg-accent relative mt-15 w-2 shrink-0 rounded-full">
            <span class="bg-accent absolute -top-11 -left-4 h-10 w-10 rounded-full"></span>
        </div>

        <div class="flex-1 space-y-4">
            <h2 class="text-accent mb-4 text-7xl font-black">Our Projects</h2>
            <p class="max-w-160 text-xl">A collection of projects that we've created and maintained.</p>

            <OurProjects count={999} cols={3} projects={data.projects} />
        </div>
    </div>

    <div class="relative mt-40 flex w-full flex-col items-center justify-center gap-4 text-center">
        <p class="text-accent text-7xl">And that's us!</p>
        <p class="max-w-400 text-4xl">Now we've spilled everything about Solync and our team, how about you get in touch with us?</p>
        <ButtonNew href="/contact" class="w-fit self-center!">Get in touch</ButtonNew>
        <img src="images/giant-logo-vector.svg" alt="giant logo" class="absolute -z-1 translate-y-23" />
    </div>
</section>
