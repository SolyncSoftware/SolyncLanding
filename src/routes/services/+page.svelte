<script lang="ts">
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import ButtonNew from '$lib/components/ButtonNew.svelte';
    import { stores as waveStores } from '$lib/stores/persistentWave.js';

    const services = [
        {
            title: 'Lorem Ipsum',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.'
        },
        {
            title: 'Dolor Sit Amet',
            body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.'
        },
        {
            title: 'Consectetur Elit',
            body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        },
        {
            title: 'Sed Do Eiusmod',
            body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.'
        }
    ];
</script>

<section class="flex flex-col gap-14">
    <PageContainer className="bg-blue-500" waveStore={waveStores.dottyLogo}>
        <div class="flex flex-col justify-between xl:flex-row xl:pr-24">
            <div class="max-w-200 space-y-4 font-medium">
                <h1 class="max-w-190 text-4xl font-black md:text-6xl">See what we offer.</h1>

                <p class="text-2xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>

                <p class="text-2xl">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
            </div>
        </div>
    </PageContainer>

    <!-- <div class="grid gap-4 text-xl sm:grid-cols-2 xl:grid-cols-3">
        {#each services as service}
            <div class="relative space-y-4 overflow-hidden rounded-4xl bg-white p-6 shadow-xl/4 sm:p-8">
                <span class="text-accent block text-4xl font-black">{service.id}</span>
                <h3 class="text-3xl font-black">{service.title}</h3>
                <p class="max-w-100 font-medium">{service.body}</p>
            </div>
        {/each}
    </div> -->

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
                <a href="https://gardens.wiki" target="_blank" rel="noopener noreferrer" class="text-accent hover:underline">Gardens Wiki</a
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

    <hr class="border-accent rounded-full border-t-4 2xl:-mx-12" />

    <div class="-ml-12 flex gap-12">
        <div class="bg-accent relative mt-15 w-2 shrink-0 rounded-full">
            <span class="bg-accent absolute -top-11 -left-4 h-10 w-10 rounded-full"></span>
        </div>

        <div class="flex-1 space-y-4">
            <h2 class="text-accent mb-8 text-7xl font-black" id="process">Our Services</h2>
            <p class="max-w-160 text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <ol class="mt-8 grid gap-4 text-xl sm:grid-cols-2 xl:grid-cols-3">
                {#each services as service, i}
                    <li class="relative space-y-2 rounded-4xl bg-white p-6 shadow-xl/4 sm:p-8">
                        <span class="text-accent block text-2xl font-black">0{i + 1}</span>
                        <h3 class="text-2xl font-black">{service.title}</h3>
                        <p class="max-w-100 font-medium">{service.body}</p>
                    </li>
                {/each}
            </ol>
        </div>
    </div>

    <div class="relative mt-40 flex w-full flex-col items-center justify-center gap-4 text-center">
        <p class="text-accent text-7xl">Sound good?</p>
        <p class="max-w-400 text-4xl">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tell us what you're working on and we'll figure out the rest together.
        </p>
        <ButtonNew href="/contact" class="w-fit self-center!">Get in touch</ButtonNew>
        <img src="images/giant-logo-vector.svg" alt="giant logo" class="absolute -z-1 translate-y-23" />
    </div>
</section>
