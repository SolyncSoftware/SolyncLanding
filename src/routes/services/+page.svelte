<script lang="ts">
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import ButtonNew from '$lib/components/ButtonNew.svelte';
    import { stores as waveStores } from '$lib/stores/persistentWave.js';

    const services = [
        {
            number: '01',
            title: 'Website creation',
            description:
                'A custom website shaped around your goals and the people you want to reach. We work with you from the first conversation through launch.',
            details: [
                'Custom design and development',
                'Layouts for phones, tablets, and desktops',
                'A collaborative process, built around your needs'
            ],
            className: 'bg-blue-500',
            label: 'Starting at $300 upfront'
        },
        {
            number: '02',
            title: 'Website Maintenance',
            description:
                'A home for your website or online service. We can help with deployment and ongoing maintenance so you can focus on what you want to build.',
            details: ['Hosting for websites and online services', 'Deployment support', 'Ongoing maintenance'],
            className: 'bg-accent',
            label: 'Starting at $175/year',
            image: '/images/services/theaceae-banner.webp'
        }
    ];
</script>

<section class="flex flex-col gap-14">
    <PageContainer className="bg-blue-500" waveStore={waveStores.dottyLogo}>
        <div class="flex flex-col justify-between xl:flex-row xl:pr-24">
            <div class="max-w-200 space-y-4 font-medium">
                <h1 class="max-w-190 text-4xl font-black md:text-6xl">See what we offer (so far).</h1>

                <p class="text-2xl">
                    Because of our ethos, our services are user-centric. Which is why we work directly with <i>you</i> to make sure your needs
                    are met. Our non-proprietary services are built with you, the owner, in mind. We want you to ensure that you have the best
                    experience possible with our services while keeping costs down.
                </p>

                <p class="text-2xl">
                    Don't see a software you need? We are constantly building what's next, so if you don't see what you're looking for, <a
                        href="/contact"
                        class="underline transition hover:text-black">reach out to us</a
                    > and we'll work with you to make it happen.
                </p>
            </div>
        </div>
    </PageContainer>

    <div class="space-y-4">
        <div class="space-y-3">
            <h2 class="text-4xl font-black md:text-5xl">Services built around people.</h2>
            <p class="text-lg font-medium md:text-xl">
                Every project is different. We'll listen first, work with you to understand what you need, and find a sensible way forward.
            </p>
        </div>

        <div class="grid gap-5 pt-4 lg:grid-cols-2">
            {#each services as service}
                <article class="flex h-full flex-col overflow-hidden rounded-4xl bg-white shadow-xl/4">
                    <div class="relative flex min-h-52 items-end overflow-hidden p-6 text-white sm:min-h-60 sm:p-8 {service.className}">
                        {#if service.image}
                            <img
                                src={service.image}
                                alt=""
                                aria-hidden="true"
                                class="absolute inset-0 h-full w-full object-cover opacity-55"
                                loading="lazy"
                            />
                            <div class="absolute inset-0 bg-black/20"></div>
                        {:else}
                            <div class="absolute -top-20 -right-12 h-64 w-64 rounded-full border-24 border-white/15"></div>
                            <div class="absolute -right-3 -bottom-32 h-64 w-64 rounded-full border-24 border-white/15"></div>
                        {/if}
                        <div class="relative z-10 flex w-full items-end justify-between gap-4">
                            <span class="text-6xl font-black sm:text-7xl">{service.number}</span>
                            <span class="rounded-full border border-white/60 bg-black/15 px-4 py-2 text-sm font-bold backdrop-blur-sm">
                                {service.label}
                            </span>
                        </div>
                    </div>

                    <div class="flex flex-1 flex-col p-6 sm:p-8">
                        <h3 class="text-3xl font-black sm:text-4xl">{service.title}</h3>
                        <p class="mt-3 text-lg leading-relaxed font-medium">{service.description}</p>

                        <ul class="mt-6 space-y-3 border-t border-black/10 pt-5 text-base font-medium sm:text-lg">
                            {#each service.details as detail}
                                <li class="flex items-start gap-3">
                                    <span class="bg-accent mt-2.5 h-2 w-2 shrink-0 rounded-full"></span>
                                    <span>{detail}</span>
                                </li>
                            {/each}
                        </ul>

                        <a href="/contact" class="text-accent group mt-8 flex w-fit items-center gap-2 text-lg font-bold hover:text-black">
                            Ask us about {service.title.toLowerCase()}
                            <img
                                src="/images/arrow-sorange.svg"
                                alt=""
                                class="h-4 w-4 -rotate-90 transition-transform group-hover:translate-x-1"
                            />
                        </a>
                    </div>
                </article>
            {/each}
        </div>
    </div>

    <div class="relative mt-40 flex w-full flex-col items-center justify-center gap-4 text-center">
        <img src="images/giant-logo-vector.svg" alt="giant logo" class="absolute -z-1 translate-y-23" />
    </div>
</section>
