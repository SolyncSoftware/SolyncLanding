<script lang="ts">
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import NavigationArrow from '$lib/components/assets/NavigationArrow.svelte';
    import { stores as waveStores } from '$lib/stores/persistentWave.js';

    const services = [
        {
            number: '01',
            title: 'Landing page creation',
            description:
                'A custom website shaped around your goals and the people you want to reach. We work with you from the first conversation through launch.',
            details: [
                'Custom design and development',
                'Fully responsive layout across mobile, tablet, and desktop',
                'A collaborative process, built around your needs'
            ],
            className: 'bg-blue-500',
            label: 'Starting at $300 upfront',
            contactValue: 'landing-page-creation'
        },
        {
            number: '02',
            title: 'Brochure website creation',
            description:
                'A polished, multi-page website that introduces your organization, explains what you offer, and gives visitors a clear way to get in touch.',
            details: [
                'Pages for your organization, services, and contact details',
                'Responsive design for mobile, tablet, and desktop',
                'Custom design developed with you'
            ],
            className: 'bg-emerald-500',
            label: 'Starting at $600 upfront',
            contactValue: 'brochure-website-creation'
        },
        {
            number: '03',
            title: 'Deployment & hosting',
            description: 'We get your application live, point your domain, set up security certificates, and handle background services.',
            details: ['Hosting for websites and online services', 'Deployment support', 'Ongoing maintenance'],
            label: 'Starting at $175/year',
            contactValue: 'deployment-hosting',
            image: '/images/services/teaser.svg'
        },
        {
            number: '04',
            title: 'Static hosting',
            description: 'We deploy your static website, connect your custom domain, and configure HTTPS so it is ready to share.',
            details: ['Hosting for static websites', 'Custom domain setup', 'HTTPS security certificates'],
            className: 'bg-cyan-500',
            label: 'Starting at $2/month',
            contactValue: 'static-hosting'
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
            <h2 class="text-accent mb-4 text-7xl font-black">Services built around others</h2>
            <p class="max-w-160 text-lg md:text-xl">
                Every project is different. We'll listen first, work with you to understand what you need, and find a sensible way forward.
            </p>
        </div>

        <div class="grid gap-5 pt-4 lg:grid-cols-2">
            {#each services as service}
                <article class="flex h-full flex-col overflow-hidden rounded-4xl bg-white shadow-xl/4">
                    <div
                        class="service-header relative flex min-h-52 items-end overflow-hidden p-6 text-white sm:min-h-60 sm:p-8 {service.className} 
                        {!service.image ? 'service-image-fallback' : ''}"
                    >
                        {#if service.image}
                            <img
                                src={service.image}
                                alt={service.title}
                                aria-hidden="true"
                                class="absolute inset-0 h-full w-full object-cover"
                                loading="lazy"
                            />
                        {/if}
                        <div class="absolute inset-0 z-1 bg-black/20"></div>
                        <div class="relative z-10 flex w-full items-end justify-between gap-4">
                            <span class="text-6xl font-black sm:text-7xl">{service.number}</span>
                            <span class="rounded-full bg-black/80 px-6 py-2 font-bold first-letter:uppercase">
                                {service.label}
                            </span>
                        </div>
                    </div>

                    <div class="flex flex-1 flex-col p-6 sm:p-8">
                        <h3 class="text-3xl font-black sm:text-4xl">{service.title}</h3>
                        <p class="mt-3 text-lg leading-relaxed font-medium">{service.description}</p>

                        <ul class="mt-6 space-y-3 border-t-2 border-black/20 pt-5 text-base font-medium sm:text-lg">
                            {#each service.details as detail}
                                <li class="flex items-start gap-3">
                                    <span class="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-black"></span>
                                    <span>{detail}</span>
                                </li>
                            {/each}
                        </ul>

                        <div class="mt-3 flex w-full flex-col items-end">
                            <NavigationArrow
                                href="/contact?service={service.contactValue}"
                                styles="!text-2xl"
                                text="ask us about {service.title.toLowerCase()}"
                            />
                        </div>
                    </div>
                </article>
            {/each}
        </div>
    </div>

    <div class="relative mt-40 flex w-full flex-col items-center justify-center gap-4 text-center">
        <img src="images/giant-logo-vector.svg" alt="giant logo" class="absolute -z-1 translate-y-10" />
    </div>
</section>

<style>
    .service-image-fallback::before {
        content: '';
        position: absolute;
        right: -45px;
        bottom: -60px;
        z-index: 0;
        width: 350px;
        height: 350px;
        background: url('/images/white_icon.svg') no-repeat;
        background-size: contain;
        opacity: 0.55;
        pointer-events: none;
    }
</style>
