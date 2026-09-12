<script lang="ts">
    import { SiBluesky, SiDiscord, SiGithub, SiYoutube } from '@icons-pack/svelte-simple-icons';
    import SolyncLogo from './SolyncLogo.svelte';
    import Button from './Button.svelte';

    const footerSections = [
        {
            title: 'Solync',
            links: [
                { name: 'About us', href: '/about' },
                { name: 'Sponsor us', href: '/donate' },
                { name: 'Our Blog', href: '/blog' }
            ]
        },
        {
            title: 'Projects',
            links: [
                // { name: 'StreamSkinner', href: 'https://streamskinner.com/', external: true },
                { name: 'Gardens Wiki', href: 'https://gardens.wiki/', external: true },
                { name: 'Potaro Wiki', href: 'https://github.com/SolyncSoftware/porter-wiki-frontend', external: true },
                { name: 'All Projects', href: '/about#our-work' }
                // { name: 'Solync Orbit', href: 'https://orbit.solync.org/' }
            ]
        },
        {
            title: 'More',
            links: [
                // { name: 'Privacy Policy', href: '/legal/privacy' },
                // { name: 'Terms of Service', href: '/legal/terms' },
                { name: 'Contact us', href: '/contact' }
            ]
        }
    ];

    const socials = [
        { icon: SiDiscord, href: 'https://discord.gg/nUeRyRtDYC' },
        { icon: SiYoutube, href: 'https://youtube.com/@SolyncSoftware' },
        { icon: SiBluesky, href: 'https://bsky.app/profile/solync.org' },
        { icon: SiGithub, href: 'https://github.com/SolyncSoftware' }
    ];
    // i don't think we should put data that doesn't change on the runtime as state :)
</script>

<footer class="bg-black text-xl text-white ">
    <!-- Donate banner -->
    <!-- <a
        class="group mb-18 flex flex-col items-center justify-between gap-4 rounded-2xl bg-black px-6 py-6 transition hover:bg-pink-500 sm:flex-row sm:px-12"
        href="/donate"
    >
        <div class="text-center sm:text-left">
            <p class="text-2xl font-bold sm:text-4xl">Software for everyone since 2024</p>
            <p class="text-base sm:text-xl">Support us by donating or becoming a sponsor</p>
        </div>
        <span class="heart text-error inline-block text-3xl transition group-hover:text-white sm:text-4xl" aria-hidden="true">&#10084;</span
        >
    </a> -->
    <div class="p-4 lg:p-10 flex flex-col lg:flex-row lg:justify-between gap-8">
        <section class="space-y-8">
            <div class="flex flex-col gap-3 text-4xl md:text-5xl lg:max-w-[10em]">
                <!-- <p class="bg-accent w-full px-4 py-4 sm:px-12 sm:py-6 md:w-fit">We're an independent software collective</p>
                <p class="bg-accent w-full px-4 py-4 sm:px-12 sm:py-6 md:w-fit">creating user-first experiences.</p> -->
                <p class="text-white bg-accent w-full p-4 md:w-fit leading-[1em]">Building what comes next, <span class="font-extrabold">together.</span></p>
            </div>
            <div class="flex flex-col gap-2 justify-start font-bold">
                <p>Join us on our journey!</p>
                <Button class="text-white  hover:bg-white hover:text-black self-start" href="/apply" text="Apply to Solync" />
            </div>
        </section>

        <section class="grid grid-cols-2 lg:grid-cols-3 gap-x-4 lg:gap-x-8 gap-y-8">
            {#each footerSections as footerSection}
            <div class="flex flex-col gap-1 col-span-1">
                <p class="font-display text-accent w-auto">
                    {footerSection.title}
                </p>
                <nav class="flex flex-col gap-1 text-white/75">
                    {#each footerSection.links as link}
                        <a
                            href={link.href}
                            class="w-fit footer-links hover:text-accent transition-colors"
                            target={link.external ? '_blank' : undefined}
                            rel={link.external ? 'noopener noreferrer' : undefined}
                        >
                            {link.name}
                        </a>
                    {/each}
                </nav>
            </div>
            {/each}
            <div class="flex flex-col gap-1 col-span-1
                lg:col-start-2 lg:row-start-2
                ">
                <p class="font-display text-accent">Social</p>
                <div class="flex flex-row flex-wrap gap-2">
                {#each socials as {icon: Icon, href}}
                    <a
                        {href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={'Social link'}
                        class="hover:text-accent flex items-center justify-center transition"
                    >
                        <Icon class="h-7 w-7 transition sm:h-6 sm:w-6" />
                    </a>
                {/each}
                </div>
            </div>
            <div class="col-span-2 lg:col-span-1
                lg:col-start-3 lg:row-start-2
                flex flex-row lg:flex-col flex-wrap
                items-start gap-2">
                <img src="/images/badges/csshard.gif" alt="css is hard" class="grow-0" loading="lazy" />
                <img src="/images/badges/powered-by-debian.gif" alt="powered by debian" class="grow-0" loading="lazy" />
                <a href="https://brainmade.org/" target="_blank">
                    <img src="/images/badges/brainmade.png" alt="90% human made" class="grow-0" loading="lazy" />
                </a>
            </div>
        </section>
    </div>
    <!-- big bottom bar with image  -->
    <section class="footer__background pt-8 h-fit min-h-[50dvh] flex flex-col justify-end">
        <div class="p-4 lg:p-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <SolyncLogo class="fill-white md:h-28" />
            <div class="leading-[1.1em] flex flex-row md:flex-col
                justify-between md:justify-start md:gap-1
                md:text-end text-white/60">
                <p>©2026 Solync.</p>
                <p>Made with <span class="heart text-error inline-block" aria-hidden="true">&#10084;</span> in Texas.</p>
            </div>
        </div>
    </section>
</footer>

<style scoped>
    footer {
        background-color: var(--color-black);
        &:img {
            display: block;
        }
    }
    .footer__background {
        background: linear-gradient(
            to bottom,
            #222222 0%,
            #222222fa 15%,
            #222222bf 100%
        ),
        url(/images/articles/fallback.png);
        background-size: cover;
    }

    .heart {
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
