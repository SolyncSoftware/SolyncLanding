<script lang="ts">
    import type { TransformedProject } from '../../../routes/api/projects/+server.js';
    import { onMount } from 'svelte';

    import ProjectCard from '../assets/ProjectCard.svelte';
    import ButtonSimple from '../ButtonSimple.svelte';

    // default count for the number of projects to display is 6, default number of columns is 2
    let { count = 6, cols = 2 } = $props();

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
        <div class="grid grid-cols-1 gap-4 md:grid-cols-{cols}">
            {#each sortedProjects as project, i}
                {#if i < count}
                    <ProjectCard {project} />
                {/if}
            {/each}
        </div>
    {/if}
</section>
