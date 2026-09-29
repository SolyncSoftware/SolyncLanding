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

    <ol class="relative grid grid-cols-1 gap-y-20 text-xl">
        {#each services as service, i}
            {@const flip = i % 2 === 1}
            {@const first = i === 0}
            {@const last = i === services.length - 1}
            <li class="relative">
                <a href={service.page} class="relative block">
                    <div class="relative z-1 space-y-2 overflow-hidden rounded-4xl bg-black p-6 text-white shadow-xl/4 sm:p-8">
                        <img
                            src="images/services/{service.image}"
                            alt="service banner"
                            class="absolute inset-0 -z-1 h-full w-full object-cover object-center"
                        />
                        <span class="text-accent block text-2xl font-black">0{i + 1}</span>
                        <h3 class="text-2xl font-black">{service.title}</h3>
                        <p class="max-w-120 font-medium">{service.body}</p>
                    </div>
                </a>

                <!-- stem -->
                <span
                    class="bg-accent absolute top-0 h-full w-2 {flip ? '-right-14' : '-left-14'} {first ? 'rounded-t-full' : ''}
                {last ? 'rounded-b-full' : ''}"
                >
                    {#if first}
                        <span class="bg-accent absolute -top-11 -left-4 h-10 w-10 rounded-full"></span>
                    {/if}
                    {#if last}
                        <span class="bg-accent absolute -bottom-4 -left-4 h-10 w-10 rounded-full"></span>
                    {/if}
                </span>

                {#if !last}
                    <!-- curved connector -->
                    <div class="pointer-events-none absolute top-full -right-14 -left-14 h-20">
                        {#if flip}
                            <!-- right stem to left stem -->
                            <div class="border-accent absolute top-0 right-0 h-1/2 w-1/2 rounded-br-4xl border-r-8 border-b-8"></div>
                            <div
                                class="border-accent absolute bottom-0 left-0 h-[calc(50%+8px)] w-1/2 rounded-tl-4xl border-t-8 border-l-8"
                            ></div>
                        {:else}
                            <!-- left stem to right stem -->
                            <div class="border-accent absolute top-0 left-0 h-1/2 w-1/2 rounded-bl-4xl border-b-8 border-l-8"></div>
                            <div
                                class="border-accent absolute right-0 bottom-0 h-[calc(50%+8px)] w-1/2 rounded-tr-4xl border-t-8 border-r-8"
                            ></div>
                        {/if}
                    </div>
                {/if}
            </li>
        {/each}
    </ol>

    <div class="relative mt-40 flex w-full flex-col items-center justify-center gap-4 text-center">
        <p class="text-accent text-7xl">Sound good?</p>
        <p class="max-w-400 text-4xl">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Shittttttttttt.</p>
        <ButtonNew href="/contact" class="w-fit self-center!">Get in touch</ButtonNew>
        <img src="images/giant-logo-vector.svg" alt="giant logo" class="absolute -z-1 translate-y-23" />
    </div>
</section>
