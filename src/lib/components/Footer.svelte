<script lang="ts">
    import { SiBluesky, SiDiscord, SiGithub, SiYoutube } from '@icons-pack/svelte-simple-icons';
    import SolyncLogo from './SolyncLogo.svelte';
    import Button from './Button.svelte';

    let footerSections = $state([
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
                { name: 'Contact us', href: '/contact' },
                { name: 'Status Page', href: 'https://status.solync.org', external: true }
            ]
        }
    ]);

    let socials = $state([
        { icon: SiDiscord, href: 'https://discord.gg/nUeRyRtDYC' },
        { icon: SiYoutube, href: 'https://youtube.com/@SolyncSoftware' },
        { icon: SiBluesky, href: 'https://bsky.app/profile/solync.org' },
        { icon: SiGithub, href: 'https://github.com/SolyncSoftware' }
    ]);
</script>

<footer class="bg-black px-5 py-12 text-xl text-white 2xl:px-70">
    <!-- Donate banner -->
    <a
        class="group mb-18 flex flex-col items-center justify-between gap-4 rounded-2xl bg-black px-6 py-6 transition hover:bg-pink-500 sm:flex-row sm:px-12"
        href="/donate"
    >
        <div class="text-center sm:text-left">
            <p class="text-2xl font-bold sm:text-4xl">Software for everyone since 2024</p>
            <p class="text-base sm:text-xl">Support us by donating or becoming a sponsor</p>
        </div>
        <span class="heart text-error inline-block text-3xl transition group-hover:text-white sm:text-4xl" aria-hidden="true">&#10084;</span
        >
    </a>

    <!-- Three bold statements -->
    <div class="mb-18 flex flex-col gap-3 text-center text-2xl font-bold sm:text-4xl md:text-6xl">
        <p class="bg-accent w-full px-4 py-4 sm:px-12 sm:py-6 md:w-fit">We're an independent software collective</p>
        <p class="bg-accent w-full px-4 py-4 sm:px-12 sm:py-6 md:w-fit">creating user-first experiences.</p>
        <p class="bg-accent w-full px-4 py-4 sm:px-12 sm:py-6 md:w-fit">Building what comes next, together.</p>
    </div>

    <!-- Main footer grid -->
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <!-- Left side -->
        <div class="flex flex-col items-center gap-4 sm:items-start">
            <a href="/" class="group block w-fit">
                <SolyncLogo
                    class="group-hover:fill-accent w-60 fill-white transition-all duration-300 ease-in-out group-hover:scale-102 sm:w-80"
                />
            </a>

            <div class="mt-auto flex w-full flex-col items-center gap-4 text-center font-bold sm:flex-row sm:text-left">
                <span>Join us on our journey!</span>
                <Button class="w-full hover:bg-white hover:text-black sm:w-fit" href="/apply" text="Apply to Solync" />
            </div>

            <ul class="flex flex-row items-center gap-4">
                {#each socials as { icon: Icon, href }}
                    <li>
                        <a
                            {href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={'Social link'}
                            class="hover:text-accent flex items-center justify-center transition"
                        >
                            <Icon class="h-7 w-7 transition sm:h-6 sm:w-6" />
                        </a>
                    </li>
                {/each}
            </ul>
        </div>

        <!-- Right side -->
        <div class="flex flex-col items-center gap-4 sm:items-end">
            <div class="flex flex-wrap justify-center gap-8 md:gap-14 xl:justify-end">
                {#each footerSections as section}
                    <div class="flex flex-col gap-4 text-center sm:text-left">
                        <span class="font-display text-accent w-auto">
                            {section.title}
                        </span>
                        <nav class="flex flex-col gap-3 text-white/75 sm:gap-4">
                            {#each section.links as link}
                                <a
                                    href={link.href}
                                    class="footer-links hover:text-accent transition-colors"
                                    target={link.external ? '_blank' : undefined}
                                    rel={link.external ? 'noopener noreferrer' : undefined}
                                >
                                    {link.name}
                                </a>
                            {/each}
                        </nav>
                    </div>
                {/each}
            </div>

            <div class="flex flex-row flex-wrap items-center justify-center gap-3">
                <img src="/images/badges/csshard.gif" alt="css is hard" class="w-auto" loading="lazy" />
                <img src="/images/badges/powered-by-debian.gif" alt="powered by debian" class="w-auto" loading="lazy" />
                <a href="https://brainmade.org/" target="_blank">
                    <img src="/images/badges/brainmade.png" alt="90% human made" class="w-auto" loading="lazy" />
                </a>
            </div>

            <div class="text-center text-sm sm:text-xl">
                &copy; {new Date().getFullYear()} Solync. Made with
                <span class="heart text-error inline-block" aria-hidden="true">&#10084;</span>
                in Texas.
            </div>
        </div>
    </div>
</footer>

<style scoped>
    footer {
        background-image: linear-gradient(to bottom, rgb(0 0 0 / 0%) 0%, #000000 76%), url(/images/articles/fallback.png);
        background-size: cover;
        &:img {
            display: block;
        }
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
