<script lang="ts">
    import { SiBluesky, SiDiscord, SiGithub, SiYoutube } from '@icons-pack/svelte-simple-icons';
    import SolyncLogo from './SolyncLogo.svelte';
    import Button from './Button.svelte';
    import ButtonNew from './ButtonNew.svelte';

    let footerSections = [
        {
            title: 'Navigation',
            links: [
                { name: 'Home', href: '/' },
                { name: 'About us', href: '/about' },
                { name: 'Sponsor us', href: '/donate' },
                { name: 'Our Blog', href: '/blog' }
            ]
        },
        {
            // title: 'Projects',
            // links: [
            //     // { name: 'StreamSkinner', href: 'https://streamskinner.com/', external: true },
            //     { name: 'Gardens Wiki', href: 'https://gardens.wiki/', external: true },
            //     { name: 'Potaro Wiki', href: 'https://github.com/SolyncSoftware/porter-wiki-frontend', external: true },
            //     { name: 'All Projects', href: '/about#our-work' }
            //     // { name: 'Solync Orbit', href: 'https://orbit.solync.org/' }
            // ]
        },
        {
            title: 'More',
            links: [
                // { name: 'Privacy Policy', href: '/legal/privacy' },
                // { name: 'Terms of Service', href: '/legal/terms' },
                { name: 'Solync Status', href: 'https://status.solync.org', external: true },
                { name: 'Contact us', href: '/contact' }
            ]
        }
    ];

    let socials = [
        { icon: SiDiscord, href: 'https://discord.gg/nUeRyRtDYC' },
        { icon: SiYoutube, href: 'https://youtube.com/@SolyncSoftware' },
        { icon: SiBluesky, href: 'https://bsky.app/profile/solync.org' },
        { icon: SiGithub, href: 'https://github.com/SolyncSoftware' }
    ];
</script>

<footer class="bg-deepblack text-xl text-white">
    <div class="bg-accent space-y-12 px-5 py-6 pb-5 2xl:px-70">
        <p class="text-4xl text-white">
            We're an independent software collective creating user-first experiences.<br />
            <span class="font-black">We collaborate to create what's next.</span>
        </p>
        <section class="flex flex-row items-center justify-between">
            <div class="flex flex-row gap-4">
                {#each socials as { icon: Icon, href }}
                    <a {href}><Icon class="h-6 w-auto" /></a>
                {/each}
            </div>
            <div class="flex flex-row flex-wrap justify-end gap-2">
                <img src="/images/badges/brainmade.png" alt="brainmade.org" class="h-8 w-auto" />
                <img src="/images/badges/csshard.gif" alt="CSS is difficult" class="h-8 w-auto" />
                <img src="/images/badges/powered-by-debian.gif" alt="Powered by Debian" class="h-8 w-auto" />
            </div>
        </section>
    </div>
    <div class="flex flex-col gap-3 px-5 py-6 lg:flex-row 2xl:px-70 [&_p]:text-xl [&_p]:leading-[1em]">
        {#each footerSections as { title, links }}
            <section
                class="[&_p]:font-blue [&>*:first-child]:text-accent flex flex-col gap-3 leading-[1em] text-white/70 lg:gap-2 [&_a]:hover:text-white [&>*:first-child]:font-black"
            >
                <p>{title}</p>
                <div class="flex flex-col gap-3 lg:flex-row lg:gap-4">
                    {#each links as { name, href }}
                        <p><a {href}>{name}</a></p>
                    {/each}
                </div>
            </section>
        {/each}
        <section
            class="mt-6 flex flex-row flex-wrap justify-between gap-2 leading-[1em] text-white lg:mt-0 lg:ml-auto lg:flex-col lg:justify-start lg:text-end"
        >
            <p class="text-accent font-black">&copy; 2026 Solync</p>
            <p class="text-white">Made with <span class="pulse text-red-400">&#10084;</span> in Texas</p>
        </section>
    </div>
</footer>

<style scoped>
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
