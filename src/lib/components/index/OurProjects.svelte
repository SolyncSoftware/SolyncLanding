<script lang="ts">
    import type { TransformedProject } from '../../../routes/api/projects/+server.js';
    import { onMount } from 'svelte';
    import ButtonSimple from '../ButtonSimple.svelte';

    let sortedProjects = $state<TransformedProject[]>([]);
    let loading = $state(true);

    onMount(async () => {
        const res = await fetch('/api/projects'),
            projects = await res.json();
        sortedProjects = [...projects].filter((project) => project.showProject).sort((a, b) => a.title.localeCompare(b.title));
        loading = false;
    });
</script>

<section class="flex flex-col gap-4">
    {#if loading}
        <p class="text-xl">Loading projects...</p>
    {:else if sortedProjects.length === 0}
        <p class="text-xl text-black">No projects found!</p>
    {:else}
        <div class="lg:grid-bg-red-500 grid grid-cols-1 gap-2 md:grid-cols-3">
            {#each sortedProjects as project}
                <div class="border-offwhite flex flex-col overflow-hidden rounded-4xl bg-white transition">
                    <img
                        loading="lazy"
                        src={project.imageSrc}
                        alt={`${project.title} logo`}
                        class="h-40 w-full rounded-4xl object-cover p-1"
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
            {/each}
        </div>
    {/if}
</section>
