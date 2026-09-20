<script lang="ts">
    import type { TransformedProject } from '../../../routes/api/projects/+server.js';
    import { onMount } from 'svelte';
    import ProjectCard from '../assets/ProjectCard.svelte';
    import useEmblaCarousel from 'embla-carousel-svelte';
    import Autoplay from 'embla-carousel-autoplay';

    // default count for the number of projects to display is 6, default number of columns is 2. autoplay is there to silent error
    let { count = 6, cols = 2, view = 'grid' as 'grid' | 'carousel', autoplay = false, autoplayDelay = 3000 } = $props();
    import { untrack } from 'svelte';
    let originalProjects = $state<TransformedProject[]>([]);
    let sortedProjects = $state<TransformedProject[]>([]);
    let loading = $state(true);
    let sortType = $state<'title' | 'dateNewest' | 'dateOldest'>('dateNewest');

    function applySort() {
        let filtered = originalProjects.filter((p) => p.showProject);
        switch (sortType) {
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'dateNewest':
                filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
                break;
            case 'dateOldest':
                filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
                break;
        }
        sortedProjects = filtered;
    }

    const autoplayPlugin = Autoplay({
        delay: untrack(() => autoplayDelay), // shushes the warning
        stopOnInteraction: false,
        stopOnMouseEnter: true
    });

    onMount(async () => {
        const res = await fetch('/api/projects');
        originalProjects = await res.json();
        applySort();
        loading = false;
    });
</script>

<section class="flex flex-col gap-4">
    {#if loading}
        <p class="text-xl">Loading projects...</p>
    {:else if sortedProjects.length === 0}
        <p class="text-xl text-black">No projects found!</p>
    {:else if view === 'carousel'}
        <div class="embla">
            <div
                class="embla__viewport"
                use:useEmblaCarousel={{
                    options: { align: 'start', loop: true },
                    plugins: [autoplayPlugin]
                }}
            >
                <div class="embla__container flex gap-4">
                    {#each sortedProjects.slice(0, count) as project}
                        <div class="embla__slide">
                            <ProjectCard {project} />
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {:else}
        <div class="grid grid-cols-1 gap-4 md:grid-cols-{cols}">
            {#each sortedProjects.slice(0, count) as project}
                <ProjectCard {project} />
            {/each}
        </div>
    {/if}
</section>

<style scoped>
    /* im not sure if this is what we want */
    .embla__viewport {
        overflow: hidden;
        -webkit-mask-image: linear-gradient(to right, transparent 0, black 48px, black calc(100% - 48px), transparent 100%);
        mask-image: linear-gradient(to right, transparent 0, black 48px, black calc(100% - 48px), transparent 100%);
    }

    .embla__container {
        display: flex;
        touch-action: pan-y pinch-zoom;
    }

    .embla__slide {
        flex: 0 0 calc(50% - 8px);
        min-width: 0;
    }

    @media (min-width: 768px) {
        .embla__slide {
            flex: 0 0 calc(33.333% - 11px);
        }
    }
</style>
