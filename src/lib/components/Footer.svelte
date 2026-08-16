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
                { name: 'Contact us', href: '/contact' }
            ]
        }
    ]);

    let socials = $state([
        { icon: SiDiscord, href: 'https://discord.gg/nUeRyRtDYC' },
        // { icon: SiYoutube, href: 'https://youtube.com/@SolyncCorp' },
        { icon: SiBluesky, href: 'https://bsky.app/profile/solync.org' },
        { icon: SiGithub, href: 'https://github.com/SolyncSoftware' }
    ]);
</script>

<footer class="3xl:max-w-560 3xl:mx-auto mx-auto bg-black px-5 py-12 text-xl text-white 2xl:px-70">
    <a
        class="group mb-18 flex flex-row items-center justify-between rounded-2xl bg-black px-12 py-6 transition hover:bg-pink-500"
        href="/donate"
    >
        <div>
            <p class="text-4xl font-bold">Software for everyone since 2024</p>
            <p class="text-xl">Support us by donating or becoming a sponsor</p>
        </div>
        <span class="heart text-error inline-block text-4xl transition group-hover:text-white" aria-hidden="true">&#10084;</span>
    </a>

    <!-- top side -->
    <div class="mb-18 flex flex-col gap-3 text-4xl font-bold sm:text-6xl">
        <p class="bg-accent w-fit px-12 py-6">We're an independent software collective</p>
        <p class="bg-accent w-fit px-12 py-6">creating user-first experiences.</p>
        <p class="bg-accent w-fit px-12 py-6">Building what comes next, together.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2">
        <!-- left side -->
        <div class="flex flex-col items-center gap-4 pb-4 sm:items-start sm:pb-0">
            <a href="/" class="group mb-auto block w-fit">
                <SolyncLogo class="group-hover:fill-accent w-80 fill-white transition-all duration-300 ease-in-out group-hover:scale-102" />
            </a>

            <div class="flex flex-col items-center gap-4 text-center font-bold sm:flex-row sm:text-left">
                Join us on our journey! <Button class="w-fit hover:bg-white hover:text-black" href="/apply" text="Apply to Solync" />
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
                            <Icon class="h-6 w-6 transition" />
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
        <!-- right side -->
        <div class="flex flex-col items-center gap-4 sm:items-end">
            <div class="flex flex-wrap justify-center gap-8 md:gap-14 xl:justify-end">
                {#each footerSections as section}
                    <div class="flex flex-col gap-4">
                        <span class="font-display text-accent w-fit">
                            {section.title}
                        </span>
                        <nav class="flex flex-col gap-4 text-white/75">
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

            <div class="flex flex-row gap-2">
                <img src="/images/badges/csshard.gif" alt="css is hard" />
                <a href="https://brainmade.org/" target="_blank">
                    <img src="/images/badges/brainmade.png" alt="90% human made!" />
                </a>
            </div>

            <div>
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
