<script lang="ts">
    import { page } from '$app/state';

    import SolyncLogo from './SolyncLogo.svelte';
    import Button from './Button.svelte';
    import ButtonSimple from './ButtonSimple.svelte';

    let currentPath = $derived(page.url.pathname);

    function isActive(path: string): string {
        return currentPath === path ? 'bg-white !text-accent font-display px-8 py-2 rounded-full' : '';
    }
</script>

<header class="bg-accent flex items-center px-5 pt-6 pb-40 xl:px-70">
    <nav class="flex items-center gap-7">
        <a href="/" class="group inline-block">
            <SolyncLogo
                iconOnly={true}
                class="w-20 fill-white transition-all duration-300 ease-in-out group-hover:scale-102 group-hover:fill-black"
            />
        </a>

        <ButtonSimple href="/" text="Home" class={`text-white hover:font-bold hover:text-white ${isActive('/')}`} />
        <ButtonSimple href="/donate" text="Donate" class={`text-white hover:font-bold hover:text-white ${isActive('/donate')}`} />
        <ButtonSimple href="/about" text="Learn more" class={`text-white hover:font-bold hover:text-white ${isActive('/about')}`} />
    </nav>

    <div class="ml-auto flex justify-end">
        <Button href="https://orbit.solync.org" text="Manage Account" />
    </div>
</header>
