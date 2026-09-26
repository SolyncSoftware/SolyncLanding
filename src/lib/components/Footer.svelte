<script lang="ts">
    import { SiBluesky, SiDiscord, SiGithub, SiYoutube } from '@icons-pack/svelte-simple-icons';
    import performanceStore from '$lib/stores/performance.js';
    import type { UnicornScene } from '$lib/utils/unicornTypes.js';
    import { tryAddScene } from '$lib/utils/unicornLifecycle.js';
    import { tick } from 'svelte';

    let footerSections = [
        {
            title: 'Navigation',
            links: [
                { name: 'About us', href: '/about' },
                { name: 'Sponsor us', href: '/donate' },
                { name: 'Our blog', href: '/blog' },
                { name: 'Projects', href: '/about#our-work' }
            ]
        },
        {
            title: 'Resources',
            links: [
                { name: 'Privacy', href: '/legal/privacy' },
                { name: 'Terms', href: '/legal/terms' },
                // { name: 'SolyncORBIT', href: 'https://orbit.solync.org/' },
                { name: 'Status', href: 'https://status.solync.org', external: true }
            ]
        },
        {
            title: 'More',
            links: [
                { name: 'Join us', href: '/apply' },
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

    const unicornSetup = {
        bg: '/solync_footer.json',
        bgPlaceholder: '/images/waves-dark.png'
    };

    let embedEl = $state<HTMLDivElement | null>(null);
    const autoUnicornEnabled = $derived(
        !$performanceStore.checked || ($performanceStore.canUseWebgl && !$performanceStore.globalHardDisabled)
    );
    const unicornEnabled = $derived(autoUnicornEnabled);
    const showPlaceholder = $derived(!unicornEnabled);
    let scene = $state<UnicornScene | null>(null);

    $effect(() => {
        let cancelled = false;

        if (unicornEnabled) {
            tick().then(async () => {
                if (!cancelled && embedEl && !scene) {
                    scene = await tryAddScene({
                        element: embedEl,
                        filePath: unicornSetup.bg,
                        lazyLoad: true,
                        fixed: true,
                        production: false,
                        scale: 1,
                        dpi: 1,
                        fps: 60
                    });
                }
            });
        }

        return () => {
            scene?.destroy();
            scene = null;
            cancelled = true;
        };
    });
</script>

<footer class="bg-deepblack text-xl text-white">
    <div class="bg-accent flex justify-between px-5 py-8 2xl:px-70">
        <div class="flex flex-col gap-2 text-5xl font-light text-white">
            <span>We're an independent software collective</span>
            <span>creating user-first experiences.</span>
            <span class="font-black">Building what comes next, together.</span>
        </div>

        <section class="flex flex-col items-end gap-4 self-end">
            <div class="flex flex-row flex-wrap justify-end gap-2">
                <a href="https://brainmade.org" target="_blank">
                    <img src="/images/badges/brainmade.png" alt="brainmade.org" class="h-8 w-auto" /></a
                >
                <img src="/images/badges/csshard.gif" alt="CSS is difficult" class="h-8 w-auto" />
                <img src="/images/badges/powered-by-debian.gif" alt="Powered by Debian" class="h-8 w-auto" />
            </div>
            <div class="flex flex-row gap-4">
                {#each socials as { icon: Icon, href }}
                    <a {href}><Icon class="h-6 w-auto transition duration-200 hover:text-black" /></a>
                {/each}
            </div>
        </section>
    </div>
    <div class="flex flex-col gap-3 px-5 py-6 lg:flex-row 2xl:px-70 [&_p]:text-xl [&_p]:leading-[1em]">
        {#each footerSections as { title, links }}
            <section
                class="[&_p]:font-blue [&>*:first-child]:text-accent flex flex-col gap-3 leading-[1em] text-white/70 lg:gap-2 [&_a]:hover:text-white [&>*:first-child]:font-black"
            >
                <p>{title}</p>
                <div class="flex flex-col gap-3 lg:flex-row lg:gap-4 [&>*:last-child]:mr-12">
                    {#each links as { name, href, external }}
                        <p><a {href} target={external ? '_blank' : undefined}>{name}</a></p>
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
    <div class="h-[15vh] min-h-24 w-full bg-black md:h-[33dvh] md:min-h-56">
        <div bind:this={embedEl} class="h-full w-full" data-us-scale="0.75"></div>
    </div>
</footer>

<style scoped>
    .pulse {
        display: inline-block;
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
