<script lang="ts">
    import { SiBluesky, SiDiscord, SiGithub, SiYoutube } from '@icons-pack/svelte-simple-icons';
    import Waves from './assets/Waves.svelte';
    import NetroLogo from './NetroLogo.svelte';

    let footerSections = $state([
        {
            title: 'NETRO',
            links: [
                { name: 'About Us', href: '/about' },
                { name: 'Work at Netro', href: '/apply' },
                { name: 'Contact us', href: '/contact' },
                { name: 'Our Blog', href: '/blog' }
            ]
        },
        {
            title: 'SERVICES',
            links: [
                { name: 'NetroHost', href: 'https://netro.host/', external: true },
                { name: 'Theaceae Collective', href: 'https://theaceae.org/', external: true },
                { name: 'Potaro Wiki', href: 'https://alpha.potaro.wiki/', external: true },
                { name: 'myNetro', href: 'https://my.netro.works/' }
            ]
        },
        {
            title: 'MORE',
            links: [
                { name: 'Privacy Policy', href: '/legal/privacy' },
                { name: 'Terms of Service', href: '/legal/terms' },
                { name: 'NetroHost Terms', href: '/legal/netrohost/terms' },
                { name: 'GitHub Sponsors', href: 'https://github.com/sponsors/NetroSoftware', external: true }
            ]
        }
    ]);

    let socials = $state([
        { icon: SiDiscord, href: 'https://discord.gg/HdKeWtV' },
        { icon: SiYoutube, href: 'https://youtube.com/@NetroCorp' },
        { icon: SiBluesky, href: 'https://bsky.app/profile/netrocorp.net' },
        { icon: SiGithub, href: 'https://github.com/NetroSoftware' }
    ]);
</script>

<footer class="border-accent relative overflow-hidden border-t-8">
    <div
        class="pointer-events-none absolute inset-0 z-0 opacity-40"
        style="background-image: radial-gradient(circle, rgb(0 0 0) 0%, rgba(0, 0, 0, 0) 67%);"
    ></div>

    <div class="col-start-1 row-start-1 h-full w-full">
        <Waves
            style="position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; background-image: url(/images/static-footer.jpg);"
            wavesType="/netro_footer.json"
        />
    </div>
    <!-- the actual footer -->
    <div class="col-start-1 row-start-1 flex flex-row justify-between gap-7 px-16 py-9 text-xl font-bold text-white/70">
        <!-- logo with text and love -->
        <div>
            <a href="/">
                <NetroLogo class="hover:fill-accent mb-8 fill-white transition-colors duration-300 ease-in-out" width="540" height="118" />
            </a>
            <div class="border-accent flex flex-col gap-7 border-l-4 pl-6">
                <p class="max-w-[42ch]">
                    Home of the future. We're a small software collective creating user-first experiences. We collaborate to create what's
                    next.
                </p>

                <span>
                    Made with
                    <span class="heart text-error inline-block">&#10084;</span>
                    in Texas.
                </span>
                <span class="text-xs tracking-[24%] text-white/40">
                    &copy; 2022-2026 NETRO LLC // Design assistance by
                    <a href="https://untone.org/" target="_blank" rel="noopener noreferrer" class="underline hover:text-white">UNTONE</a>.
                </span>
            </div>
        </div>
        <div class="flex flex-col justify-between">
            <div class="flex flex-row gap-14">
                {#each footerSections as section}
                    <div class="flex flex-col gap-4">
                        <span class="bg-accent font-display w-fit px-3 py-2 font-semibold text-black">
                            {section.title}
                        </span>
                        <nav class="border-accent flex flex-col gap-4 border-l-2 pl-4">
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
            <div>
                <ul class="flex flex-row items-center justify-end gap-4 text-white">
                    {#each socials as { icon: Icon, href }}
                        <li>
                            <a
                                {href}
                                target="_blank"
                                rel="noopener noreferrer"
                                class="border-accent flex items-center justify-center border-2 bg-black p-3 transition hover:border-white"
                            >
                                <Icon class="text-white" />
                            </a>
                        </li>
                    {/each}
                </ul>
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
