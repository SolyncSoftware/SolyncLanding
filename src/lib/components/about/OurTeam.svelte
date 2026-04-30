<script lang="ts">
    import { SiBluesky, SiGithub } from '@icons-pack/svelte-simple-icons';
    import { onMount } from 'svelte';
    import type { TransformedMember } from '../../../routes/api/team/+server.js';

    let sortedMembers = $state<TransformedMember[]>([]);
    let loading = $state(true);

    onMount(async () => {
        const res = await fetch('/api/team'),
            members = await res.json();
        sortedMembers = [...members].sort((a, b) => a.realName.localeCompare(b.realName));
        loading = false;
    });

    let expandedIndex = $state(null);
    function toggleBio(i: any) {
        expandedIndex = expandedIndex === i ? null : i;
    }

    function stopPropagation(e: MouseEvent) {
        e.stopPropagation();
    }
</script>

<section class="flex flex-col gap-4">
    <!-- todo: make links more flexible -->
    {#if loading}
        <p class="text-xl">Loading team members...</p>
    {:else if sortedMembers.length === 0}
        <p class="text-xl text-gray-400">No team members found!</p>
    {:else}
        {#each sortedMembers as member, i}
            <div class="flex flex-col">
                <button
                    onclick={() => toggleBio(i)}
                    class={[
                        'hover:text-accent flex cursor-pointer flex-row items-center justify-center gap-4 align-middle',
                        expandedIndex === i ? 'text-accent' : 'text-white'
                    ]}
                >
                    <img class="h-19 w-19" loading="lazy" src={member.avatarSrc} alt={member.realName} />
                    <div class="flex flex-row items-end gap-4 text-left transition">
                        <p class="text-4xl font-bold">{member.realName}</p>
                        <p class="text-2xl font-light">{member.username}</p>
                    </div>

                    <div class="ml-auto flex flex-row items-center gap-4 text-white">
                        {#if member.github !== '#'}
                            <a href={member.github} target="_blank" class="hover:text-gray-400" onclick={stopPropagation}>
                                <SiGithub class="h-7 w-7" title="GitHub" />
                            </a>
                        {/if}
                        {#if member.bluesky !== '#'}
                            <a href={member.bluesky} target="_blank" class="hover:text-gray-400" onclick={stopPropagation}>
                                <SiBluesky class="h-7 w-7" title="Bluesky" />
                            </a>
                        {/if}
                    </div>
                </button>
                <p
                    class={[
                        'cursor-default pl-23 text-left font-sans text-xl transition-all duration-300 ease-in-out',
                        expandedIndex == i ? 'max-h-96 leading-6 opacity-100' : 'max-h-0 leading-0 opacity-0'
                    ]}
                >
                    {member.bio}
                </p>
            </div>
            {#if i < sortedMembers.length - 1}
                <hr class="text-white/15" />
            {/if}
        {/each}
    {/if}
    <div class="mt-12 flex flex-row items-center justify-end gap-6 text-xl">
        <span class="font-bold">Think you'd be a good addition?</span>
        <a href="/apply" class="bg-accent hover:bg-accent/70 flex items-center gap-4 py-4 pr-4 pl-7 font-bold">
            JOIN NETRO<img src="/images/arrow-default.png" alt="arrow pointing down" />
        </a>
    </div>
</section>
