<script lang="ts">
    import { SiBluesky, SiDiscord, SiGithub, SiYoutube } from '@icons-pack/svelte-simple-icons';
    import SolyncLogo from './SolyncLogo.svelte';

    let footerSections = $state([
        {
            title: 'Resources',
            links: [
                { name: 'About Us', href: '/about' },
                { name: 'Jobs', href: '/apply' },
                { name: 'Our Blog', href: '/blog' }
            ]
        },
        {
            title: 'Services',
            links: [
                // { name: 'StreamSkinner', href: 'https://streamskinner.com/', external: true },
                { name: 'Gardens Wiki', href: 'https://gardens.wiki/', external: true },
                { name: 'SolyncORBIT', href: 'https://orbit.solync.org/' }
            ]
        },
        {
            title: 'More',
            links: [
                { name: 'Privacy Policy', href: '/legal/privacy' },
                { name: 'Terms of Service', href: '/legal/terms' },
                { name: 'Contact us', href: '/contact' }
            ]
        }
    ]);

    let socials = $state([
        { icon: SiDiscord, href: 'https://discord.gg/HdKeWtV' },
        // { icon: SiYoutube, href: 'https://youtube.com/@SolyncCorp' },
        // { icon: SiBluesky, href: 'https://bsky.app/profile/solynccorp.net' },
        { icon: SiGithub, href: 'https://github.com/SolyncSoftware' }
    ]);
</script>

<footer class="bg-black text-white">
    <div class="3xl:max-w-560 3xl:mx-auto mx-auto px-5 py-6 xl:px-70">
        <div class="flex flex-col gap-10 xl:flex-row xl:justify-between">
            <div class="flex flex-col items-center text-center xl:items-start xl:text-left">
                <a href="/" class="group mb-5 block w-fit">
                    <SolyncLogo
                        class="group-hover:fill-accent w-70 fill-white transition-all duration-300 ease-in-out group-hover:scale-102"
                    />
                </a>
                <!-- <p class="max-w-[42ch] text-xl">
                    We're an independent software collective creating user-first experiences. We collaborate to create what's next.
                </p> -->
                <span class="text-xl">
                    &copy; {new Date().getFullYear()} Solync. Made with
                    <span class="heart text-error inline-block" aria-hidden="true">&#10084;</span>
                    in Texas.
                </span>
            </div>

            <div class="flex flex-wrap justify-center gap-8 md:gap-14 xl:justify-end">
                {#each footerSections as section}
                    <div class="flex flex-col gap-4 text-xl">
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
        </div>

        <div class="flex flex-col items-center justify-between gap-6 pt-5 md:flex-row">
            <ul class="flex flex-row items-center gap-5">
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
            <div class="flex justify-center">
                <img src="/images/badges/csshard.gif" alt="css is hard" class="h-auto max-h-8 w-auto" />
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
