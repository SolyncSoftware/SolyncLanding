<script>
    import rs from 'rune-scroller';

    let { project } = $props();

    import { SiGithub } from '@icons-pack/svelte-simple-icons';
    import { Globe } from '@lucide/svelte';
</script>

<div
    class="z-1 flex min-h-150 rounded-4xl text-white shadow-xl/4"
    use:rs={{ animation: 'fade-up', duration: 800, repeat: false, delay: 0, offset: 0 }}
>
    <div class="group relative flex w-full flex-col justify-end gap-2 overflow-hidden rounded-3xl p-7 text-lg">
        <enhanced:img
            src={project.imageSrc}
            alt={project.title}
            class="absolute inset-0 -z-1 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
        />

        <div
            class="bg-deepblack/80 absolute inset-0 z-1 flex items-center gap-3 px-30 py-5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            class:justify-between={project.website !== '#' && project.github !== '#'}
            class:justify-center={!(project.website !== '#' && project.github !== '#')}
        >
            {#if project.website !== '#'}
                <a
                    href={project.website}
                    target="_blank"
                    class="hover:text-accent flex flex-col items-center gap-2 text-2xl transition-colors"
                >
                    <Globe class="h-15 w-auto" title="Website" />
                    Website
                </a>
            {/if}

            {#if project.website !== '#' && project.github !== '#'}
                <div class="h-full w-0.75 rounded-full bg-white/30"></div>
            {/if}

            {#if project.github !== '#'}
                <a
                    href={project.github}
                    target="_blank"
                    class="hover:text-accent flex flex-col items-center gap-2 text-2xl transition-colors"
                >
                    <SiGithub class="h-15 w-auto" title="GitHub" />
                    GitHub
                </a>
            {/if}
        </div>

        <div
            class="to-deepblack absolute inset-0 -z-1 bg-linear-to-l from-transparent transition-opacity duration-300 group-hover:opacity-0"
        ></div>

        <h3
            class="text-accent pointer-events-none absolute top-7 left-7 text-6xl font-black transition-opacity duration-300 [writing-mode:vertical-rl] group-hover:opacity-0"
        >
            {project.title}
        </h3>
        <p class="pointer-events-none mt-auto max-w-113 leading-6 transition-opacity duration-300 group-hover:opacity-0">
            {project.desc}
        </p>
    </div>
</div>
