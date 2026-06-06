<script lang="ts">
    import type { TransformedProject } from '../../../routes/api/projects/+server.js';
    import { onMount } from 'svelte';
    import ButtonSimple from '../ButtonSimple.svelte';

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
    {:else}
        <div class="lg:grid-bg-red-500 grid grid-cols-1 gap-4 md:grid-cols-2">
            {#each sortedProjects as project, i}
                {#if i < 6}
                    <div class="border-offwhite flex flex-col overflow-hidden rounded-4xl bg-white/80 shadow-xl/4 transition">
                        <img
                            loading="lazy"
                            src={project.imageSrc}
                            alt={`${project.title} logo`}
                            class="h-55 w-full rounded-4xl object-cover p-1"
                        />
                        <div class="flex h-full flex-col px-6 pt-1 pb-6 text-lg">
                            <h3 class="text-accent text-2xl font-bold">{project.title}</h3>
                            <p class="line-clamp-3 leading-5">{project.desc}</p>

                            <div class="mt-auto flex gap-4">
                                {#if project.page !== '#'}
                                    <ButtonSimple text="Case Study" href={project.page} class="mt-4 self-start text-lg" />
                                {/if}
                                {#if project.website !== '#'}
                                    <ButtonSimple text="Website" href={project.website} target="_blank" class="mt-4 self-start text-lg" />
                                {/if}
                                {#if project.github !== '#'}
                                    <ButtonSimple text="GitHub" href={project.github} target="_blank" class="mt-4 self-start text-lg" />
                                {/if}
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    {/if}
</section>
