<script lang="ts">
    import { page } from '$app/state';

    import SolyncLogo from './SolyncLogo.svelte';
    import Button from './Button.svelte';
    import ButtonSimple from './ButtonSimple.svelte';

    let currentPath = $derived(page.url.pathname);

    function isActive(path: string): string {
        return currentPath === path ? 'bg-white !text-accent font-display px-8 py-2 rounded-full no-underline!' : '';
    }
</script>

<!-- This mobile stuff is very temporary. wanna replace with a hamburger eventually. -->
<header class="bg-accent flex w-full flex-col items-center px-5 pt-6 pb-40 sm:flex-row 2xl:px-70">
    <nav class="flex flex-col items-center gap-7 sm:flex-row">
        <a href="/" class="group inline-block">
            <SolyncLogo
                iconOnly={true}
                class="w-20 fill-white transition-all duration-300 ease-in-out group-hover:scale-102 group-hover:fill-black"
            />
        </a>

        <ButtonSimple href="/" text="Home" class={`z-0 text-white hover:text-white hover:underline ${isActive('/')}`} />
        <ButtonSimple href="/blog" text="Blog" class={`z-0 text-white hover:text-white hover:underline ${isActive('/blog')}`} />
        <ButtonSimple href="/about" text="Learn more" class={`z-0 text-white hover:text-white hover:underline ${isActive('/about')}`} />
    </nav>

    <div class="mt-7 flex gap-2 sm:mt-0 sm:ml-auto sm:justify-end">
        <Button href="/donate" class="shadow-none" text="Support us" />
        <!-- <Button href="https://orbit.solync.org" class="shadow-none" text="Manage Account" /> -->
    </div>
</header>
