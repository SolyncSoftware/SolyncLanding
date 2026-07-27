<script lang="ts">
    import type { TransformedProject } from '../../../routes/api/projects/+server.js';
    import { onMount } from 'svelte';
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
        <div class={`lg:grid-bg-red-500 grid grid-cols-1 gap-4 md:grid-cols-${cols}`}>
            {#each sortedProjects as project, i}
                {#if i < count}
                    <div class="flex min-h-118 rounded-4xl bg-white p-2 text-white shadow-xl/4 transition">
                        <div
                            class="flex w-full flex-col justify-end gap-2 rounded-3xl bg-cover bg-center p-5 text-lg"
                            style="background-image: linear-gradient(to bottom, transparent, rgba(0,0,0,1)), url('{project.imageSrc}');"
                        >
                            <h3 class="text-accent text-3xl font-bold tracking-wide">{project.title}</h3>
                            <p>{project.desc}</p>

                            <div class="flex gap-3">
                                {#if project.page !== '#'}
                                    <ButtonSimple text="Case Study" href={project.page} class="self-start text-lg! hover:text-white" />
                                {/if}
                                {#if project.website !== '#'}
                                    <ButtonSimple
                                        text="Website"
                                        href={project.website}
                                        target="_blank"
                                        class="self-start text-lg! hover:text-white"
                                    />
                                {/if}
                                {#if project.github !== '#'}
                                    <ButtonSimple
                                        text="GitHub"
                                        href={project.github}
                                        target="_blank"
                                        class="self-start text-lg! hover:text-white"
                                    />
                                {/if}
                            </div>
                        </div>
                    </div>
                {/if}
            {/each}
        </div>
    {/if}
</section>
