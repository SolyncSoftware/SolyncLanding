<script lang="ts">
    import { page } from '$app/state';
    import { slide, fade } from 'svelte/transition';
    import { quartInOut } from 'svelte/easing';

    import AnnouncementContainer from './assets/AnnouncementContainer.svelte';
    import SolyncLogo from './SolyncLogo.svelte';
    import Button from './Button.svelte';
    import ButtonSimple from './ButtonSimple.svelte';
    import rs from 'rune-scroller';

    let showAnnouncement = $state(false); // Set to true when we're ready
    let currentPath = $derived(page.url.pathname);

    function isActive(path: string): string {
        return currentPath === path ? 'bg-white !text-accent font-display px-8 py-2 rounded-full no-underline!' : '';
    }

    function isActiveMobile(path: string): string {
        return currentPath === path ? 'font-black' : '';
    }

    let isMenuOpen = $state(false);

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function closeMenu() {
        isMenuOpen = false;
    }

    const navLinks = [
        { href: '/', text: 'Home' },
        { href: '/blog', text: 'Blog' },
        { href: '/about', text: 'Learn more' }
    ];
</script>

<!-- {#if showAnnouncement == true}
    <AnnouncementContainer />
{/if} -->

<header class="bg-accent flex w-full items-center justify-between px-5 pt-6 pb-40 2xl:px-70">
    <!-- Logo -->
    <div
        class="relative top-0 flex w-full flex-row items-center gap-7"
        use:rs={{
            animation: 'fade',
            duration: 600,
            delay: 200
        }}
    >
        <a href="/" class="group inline-block">
            <SolyncLogo
                iconOnly={true}
                class="w-16 fill-white transition-all duration-300 ease-in-out group-hover:scale-102 group-hover:fill-black sm:w-20"
            />
        </a>

        <!-- Desktop nav  -->
        <nav class="hidden flex-row items-center gap-7 sm:flex">
            {#each navLinks as link, i (link.href)}
                <span
                    use:rs={{
                        animation: 'fade-up',
                        duration: 600,
                        delay: (i + 3) * 200,
                        offset: 100
                    }}
                >
                    <ButtonSimple
                        href={link.href}
                        text={link.text}
                        class={`z-0 text-white hover:text-white hover:underline ${isActive(link.href)}`}
                    />
                </span>
            {/each}
        </nav>

        <!-- hamburger noodle -->
        <button
            onclick={toggleMenu}
            class="relative ml-auto h-12 w-12 text-white focus:outline-none sm:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
        >
            {#if isMenuOpen}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    transition:fade={{ duration: 200 }}
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            {:else}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    transition:fade={{ duration: 200 }}
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            {/if}
        </button>
    </div>

    <div
        class="hidden shrink-0 sm:ml-auto sm:inline-block"
        use:rs={{
            animation: 'fade-up',
            duration: 600,
            delay: 1200,
            offset: 100
        }}
    >
        <Button href="/donate" class="shadow-none" text="Support us" />
    </div>
</header>

<!-- mobile menu -->
{#if isMenuOpen}
    <!-- <div id="mobile-menu" class="bg-accent -mt-30 px-5 pb-40 sm:hidden" transition:slide={{ duration: 400, easing: quartInOut }}>
        <nav class="flex flex-col items-start gap-7">
            <ButtonSimple
                href="/"
                text="Home"
                onclick={closeMenu}
                class={`z-0 text-white hover:text-white hover:underline ${isActive('/')}`}
            />
            <ButtonSimple
                href="/blog"
                text="Blog"
                onclick={closeMenu}
                class={`z-0 text-white hover:text-white hover:underline ${isActive('/blog')}`}
            />
            <ButtonSimple
                href="/about"
                text="Learn more"
                onclick={closeMenu}
                class={`z-0 text-white hover:text-white hover:underline ${isActive('/about')}`}
            />
            <ButtonSimple
                href="/donate"
                text="Support us"
                onclick={closeMenu}
                class={`z-0 text-white hover:text-white hover:underline ${isActive('/donate')}`}
            />
        </nav>
    </div> -->
    <section class="bg-accent fixed top-0 z-4000 flex h-dvh w-full flex-col p-5 pt-6 sm:hidden" transition:fade={{ duration: 150 }}>
        <div class="relative top-0 flex flex-row items-center justify-between">
            <a href="/" class="group inline-block">
                <SolyncLogo
                    iconOnly={true}
                    class="w-16 fill-white transition-all duration-300 ease-in-out group-hover:scale-102 group-hover:fill-black sm:w-20"
                />
            </a>
            <button
                onclick={toggleMenu}
                class="relative ml-auto h-12 w-12 text-white focus:outline-none sm:hidden"
                aria-expanded={isMenuOpen}
                aria-label="Close menu"
                aria-controls="mobile-menu"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="absolute top-1/2 left-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    transition:fade={{ duration: 200 }}
                >
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
        <nav
            class="[&_a]: mb-16 flex grow flex-col items-start
            justify-center gap-4 [&_a]:text-4xl [&_a]:text-white
            "
        >
            <a href="/" class={isActiveMobile('/')} onclick={closeMenu}>Home</a>
            <a href="/blog" class={isActiveMobile('/blog')} onclick={closeMenu}>Blog</a>
            <a href="/about" class={isActiveMobile('/about')} onclick={closeMenu}>Learn more</a>
            <a href="/donate" class={isActiveMobile('/donate')} onclick={closeMenu}>Support us</a>
        </nav>
    </section>
{/if}
