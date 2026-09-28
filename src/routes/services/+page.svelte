<script lang="ts">
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import ButtonNew from '$lib/components/ButtonNew.svelte';
    import ButtonSimple from '$lib/components/ButtonSimple.svelte';
    import { stores as waveStores } from '$lib/stores/persistentWave.js';

    const services = [
        {
            title: 'Lorem Ipsum',
            body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
            page: '/dolar',
            image: 'theaceae-banner.webp'
        },
        {
            title: 'Dolor Sit Amet',
            body: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo.',
            page: '/dolar',
            image: 'theaceae-banner.webp'
        },
        {
            title: 'Consectetur Elit',
            body: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
            page: '/dolar',
            image: 'theaceae-banner.webp'
        },
        {
            title: 'Sed Do Eiusmod',
            body: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.',
            page: '/dolar',
            image: 'theaceae-banner.webp'
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

    <div class="-ml-12 flex gap-12">
        <div class="bg-accent relative mt-15 w-2 shrink-0 rounded-full">
            <span class="bg-accent absolute -top-11 -left-4 h-10 w-10 rounded-full"></span>
        </div>

        <div class="flex-1 space-y-4">
            <h2 class="text-accent text-7xl font-black" id="process">Our Services</h2>
            <p class="max-w-160 text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <ol class="grid grid-cols-1 gap-4 text-xl">
                {#each services as service, i}
                    <a href={service.page}>
                        <li class="relative z-1 space-y-2 overflow-hidden rounded-4xl bg-black p-6 text-white shadow-xl/4 sm:p-8">
                            <img
                                src="images/services/{service.image}"
                                alt="service banner"
                                class="absolute inset-0 -z-1 h-full w-full object-cover object-center"
                            />
                            <span class="text-accent block text-2xl font-black">0{i + 1}</span>
                            <h3 class="text-2xl font-black">{service.title}</h3>
                            <p class="max-w-120 font-medium">{service.body}</p>
                        </li>
                    </a>
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
