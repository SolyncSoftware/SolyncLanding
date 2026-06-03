<script lang="ts">
    import { SiBluesky, SiDiscord, SiGithub, SiYoutube } from '@icons-pack/svelte-simple-icons';
    import SolyncLogo from './SolyncLogo.svelte';

    let footerSections = $state([
        {
            title: 'Solync',
            links: [
                { name: 'About Us', href: '/about' },
                { name: 'Work at Solync', href: '/apply' },
                { name: 'Contact us', href: '/contact' },
                { name: 'Our Blog', href: '/blog' }
            ]
        },
        {
            title: 'Services',
            links: [
                { name: 'Solynchosting', href: 'https://solync.host/', external: true },
                { name: 'Theaceae Collective', href: 'https://theaceae.org/', external: true },
                { name: 'Gardens Wiki', href: 'https://alpha.potaro.wiki/news/gardens-wiki', external: true },
                { name: 'SolyncORBIT', href: 'https://orbit.solync.org/' }
            ]
        },
        {
            title: 'More',
            links: [
                { name: 'Privacy Policy', href: '/legal/privacy' },
                { name: 'Terms of Service', href: '/legal/terms' },
                { name: 'Solynchosting Terms', href: '/legal/solynchosting/terms' },
                { name: 'GitHub Sponsors', href: 'https://github.com/sponsors/SolyncSoftware', external: true }
            ]
        }
    ]);

    let socials = $state([
        { icon: SiDiscord, href: 'https://discord.gg/HdKeWtV' },
        { icon: SiYoutube, href: 'https://youtube.com/@SolyncCorp' },
        { icon: SiBluesky, href: 'https://bsky.app/profile/solynccorp.net' },
        { icon: SiGithub, href: 'https://github.com/SolyncSoftware' }
    ]);
</script>

<footer class="bg-black text-white">
    <div class="3xl:max-w-560 3xl:mx-auto flex flex-col justify-between gap-7 px-5 py-6 text-xl xl:flex-row xl:px-70">
        <div>
            <a href="/" class="group flex w-fit justify-center xl:block">
                <SolyncLogo class="fill-accent mb-8 w-70 transition-all duration-300 ease-in-out group-hover:scale-102 hover:fill-white " />
            </a>
            <div class="flex flex-col items-center gap-5 text-center xl:items-start xl:text-left">
                <p class="max-w-[42ch]">
                    We're a independent software collective creating user-first experiences. We collaborate to create what's next.
                </p>

                <span>
                    Made with
                    <span class="heart text-error inline-block">&#10084;</span>
                    in Texas.
                </span>
                <ul class="flex flex-row items-center justify-center gap-5 text-white xl:mt-0 xl:justify-end">
                    {#each socials as { icon: Icon, href }}
                        <li>
                            <a {href} target="_blank" rel="noopener noreferrer" class="flex items-center justify-center transition">
                                <Icon class="hover:text-accent" />
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
        <div class="flex flex-col justify-between">
            <div class="flex flex-row flex-wrap gap-14 md:justify-center xl:justify-start">
                {#each footerSections as section}
                    <div class="flex flex-col gap-4">
                        <span class="text-accent font-display w-fit">
                            {section.title}
                        </span>
                        <nav class="flex flex-col gap-4 text-white/75">
                            {#each section.links as link}
                                <a
                                    href={link.href}
                                    class="footer-links transition-colors"
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
            <div class="flex justify-center gap-2 xl:justify-end">
                <img src="/images/badges/csshard.gif" alt="css is hard" />
            </div>
        </div>
    </div>
</footer>

<style scoped>
    a.footer-links {
        &:hover {
            color: #ffffff;
        }
    }

    a:hover {
        color: #bbbbbb;
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
