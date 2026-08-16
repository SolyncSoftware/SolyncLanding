<script lang="ts">
    import { page } from '$app/state';

    import SolyncLogo from './SolyncLogo.svelte';
    import Button from './Button.svelte';
    import ButtonSimple from './ButtonSimple.svelte';

    let currentPath = $derived(page.url.pathname);

    function isActive(path: string): string {
        return currentPath === path ? 'bg-white !text-accent font-display px-8 py-2 rounded-full no-underline!' : '';
    }

    let isMenuOpen = $state(false);

    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
    }

    function closeMenu() {
        isMenuOpen = false;
    }
</script>

<!-- This mobile stuff is very temporary. wanna replace with a hamburger eventually. -->
<header class="bg-accent flex w-full items-center justify-between px-5 pt-6 pb-40 2xl:px-70">
    <!-- Logo -->
    <div class="flex-row items-center gap-7 sm:flex">
        <a href="/" class="group inline-block">
            <SolyncLogo
                iconOnly={true}
                class="w-20 fill-white transition-all duration-300 ease-in-out group-hover:scale-102 group-hover:fill-black"
            />
        </a>

        <!-- Desktop navigation (hidden on mobile) -->
        <nav class="flex-row items-center gap-7 sm:flex">
            <ButtonSimple href="/" text="Home" class={`z-0 text-white hover:text-white hover:underline ${isActive('/')}`} />
            <ButtonSimple href="/blog" text="Blog" class={`z-0 text-white hover:text-white hover:underline ${isActive('/blog')}`} />
            <ButtonSimple href="/about" text="Learn more" class={`z-0 text-white hover:text-white hover:underline ${isActive('/about')}`} />
        </nav>

        <!-- Hamburger button (mobile only) -->
        <button onclick={toggleMenu} class="text-white focus:outline-none sm:hidden" aria-expanded={isMenuOpen} aria-controls="mobile-menu">
            {#if isMenuOpen}
                <!-- Close icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            {:else}
                <!-- Hamburger icon -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            {/if}
        </button>

        <!-- Mobile menu overlay (shown when open) -->
        {#if isMenuOpen}
            <div id="mobile-menu" class="bg-red-500 px-5 sm:hidden">
                <nav class="flex flex-col items-center gap-7">
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
                    <Button href="/donate" class="shadow-none" text="Support us" onclick={closeMenu} />
                </nav>
            </div>
        {/if}
    </div>

    <!-- Desktop support button (hidden on mobile) -->
    <div class="hidden sm:ml-auto sm:flex">
        <Button href="/donate" class="shadow-none" text="Support us" />
    </div>
</header>
