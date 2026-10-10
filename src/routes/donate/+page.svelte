<script lang="ts">
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import Button from '$lib/components/Button.svelte';
    import { stores as waveStores } from '$lib/stores/persistentWave.js';
    import { Server, ShieldCheck, UsersRound } from '@lucide/svelte';

    const supportCards = [
        {
            title: 'Supports the Team',
            description: 'A small team develops and runs Solync. Your support helps them continue their work.',
            icon: UsersRound
        },
        {
            title: 'Server Infrastructure',
            description: 'Contributions help cover the hosting and infrastructure behind Solync and projects we maintain.',
            icon: Server
        },
        {
            title: 'Self Sustaining',
            description: 'Your contributions keep us from becoming dependent on external funding and sponsors.',
            icon: ShieldCheck
        }
    ];
</script>

<section class="flex flex-col gap-12 sm:gap-14">
    <PageContainer className="bg-pink-500/90 text-white" waveStore={waveStores.dottyLogo}>
        <div class="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
            <!-- Text Column -->
            <div class="max-w-210 space-y-4 font-medium">
                <h1 class="text-4xl font-black md:text-6xl">Build a better Solync.</h1>
                <p class=" text-2xl">
                    Solync is a software startup based in Texas, United States. We're a collective of thinkers who like to showcase our work
                    while staying ethical to the end user. We run scalable services (SolyncHosting, Gardens Wiki) without any CEO, board, or
                    hierarchy. If you send us money, you'll help us scale and build a better Solync.
                </p>
                <p class=" text-2xl">
                    Our greatest priority is giving back to users and empowering them with cool stuff, whether it be software or something
                    else we find interesting. We wish to create a pleasant end-user experience that's sustainable, ethical, and really cool!
                </p>
                <p class=" mb-6 text-2xl">
                    We need a way to scale to build better software, and funding us helps keep Solync on that path towards sustainability.
                    Your contributions are greatly appreciated and will not go to waste.
                </p>
            </div>
        </div>
    </PageContainer>

    <!-- <section class="space-y-5">
        <div class="space-y-2">
            <h2 id="donation-history-heading" class="text-accent text-4xl font-black sm:text-5xl">Monthly donations</h2>
            <p class="max-w-180 text-lg leading-relaxed sm:text-xl">
                We believe in transparency, so we plan to build a platform where users can view all of our donations, earnings, and more!
            </p>
        </div>

        <div class="grid gap-5 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)]">
            <article class="rounded-4xl bg-white p-5 shadow-xl/4 sm:p-7">
                <div class="flex flex-wrap items-center justify-between gap-3">
                    <h3 class="text-2xl font-black sm:text-4xl">Donation history</h3>
                </div>

                <div
                    class="bg-offwhite relative mt-5 flex min-h-64 items-center justify-center overflow-hidden rounded-3xl p-5 sm:min-h-72"
                >
                    <p class="text-lg">WIP</p>
                </div>
            </article>

            <article class="flex min-h-88 flex-col rounded-4xl bg-white p-5 shadow-xl/4 sm:p-7">
                <div>
                    <h3 class="text-2xl font-black sm:text-4xl">Recent donations</h3>
                </div>
                <div class="my-auto py-10 text-center">WIP</div>
            </article>
        </div>
    </section> -->

    <section>
        <h2 class="max-w-200 text-4xl leading-14 font-thin text-black sm:text-6xl">
            Why should I support Solync? <span class="text-accent font-black">Where does the money go?</span>
        </h2>

        <div class="mt-10 grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {#each supportCards as card}
                {@const Icon = card.icon}
                <article class="flex h-full flex-col rounded-4xl bg-white p-5 sm:p-6">
                    <div class="bg-accent flex h-20 w-20 items-center justify-center rounded-full sm:h-24 sm:w-24">
                        <Icon class="h-8 w-8 text-white sm:h-9 sm:w-9" strokeWidth={2.5} />
                    </div>

                    <h3 class="mt-5 text-2xl font-black text-black sm:text-[1.75rem]">{card.title}</h3>
                    <p class="mt-3 text-base leading-relaxed text-black sm:text-lg">{card.description}</p>
                </article>
            {/each}
        </div>
    </section>

    <section class="overflow-hidden rounded-4xl bg-pink-500 p-5 text-white shadow-xl/10 sm:p-8 lg:p-10">
        <div class="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] lg:gap-12">
            <div class="max-w-150 py-4">
                <h2 class="text-4xl leading-tight font-black sm:text-5xl">
                    Help build what comes next, together.
                    <span class="pulse pl-2 text-4xl text-white">&#10084;</span>
                </h2>
                <p class="mt-4 max-w-130 text-lg leading-relaxed text-white/90 sm:text-xl">
                    Your contribution helps our small team create ethical software and keeps Solync going!
                </p>

                <div class="mt-6 flex flex-wrap gap-4">
                    <Button
                        class="text-accent! w-fit bg-white font-bold!"
                        href="https://ko-fi.com/solync"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Visit our Ko-fi
                    </Button>
                    <Button
                        class="text-accent! w-fit bg-white font-bold!"
                        href="https://github.com/sponsors/SolyncSoftware"
                        target="_blank"
                        rel="noopener noreferrer"
                        >Visit GitHub Sponsors
                    </Button>
                </div>
            </div>

            <div class="mx-auto w-full max-w-100 overflow-hidden rounded-3xl bg-white shadow-2xl">
                <iframe
                    id="kofiframe"
                    class="block w-full rounded-3xl"
                    src="https://ko-fi.com/solync/?hidefeed=true&widget=true&embed=true"
                    style="border:none;background:var(--color-white); box-shadow:none;"
                    height="600"
                    title="Support Solync on Ko-fi"
                ></iframe>
            </div>
        </div>
    </section>
</section>

<style scoped>
    .pulse {
        display: inline-block;
        animation: pulse 2s ease infinite;
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
            transform: scale(1);
        }

        50% {
            opacity: 0.727;
            transform: scale(1.2);
        }
    }
</style>
