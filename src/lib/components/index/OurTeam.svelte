<script lang="ts">
    import type { TransformedMember } from '../../../routes/api/team/+server.js';
    import { onMount } from 'svelte';
    import TeamCard from '../assets/TeamCard.svelte';

    let { members } = $props();
    let sortedMembers = $derived.by(() =>
        [...members].filter((member) => member.showUser).sort((a, b) => a.realName.localeCompare(b.realName))
    );
    let expandedIndex = $state<number | null>(null);

    function toggleBio(index: number) {
        expandedIndex = expandedIndex === index ? null : index;
    }
</script>

<section class="columns-1 gap-4 sm:columns-2">
    {#if sortedMembers.length === 0}
        <p class="text-xl text-black">No team members found!</p>
    {:else}
        {#each sortedMembers as member, i}
            <div class="mb-4 break-inside-avoid">
                <TeamCard {member} index={i} expanded={expandedIndex === i} onToggle={toggleBio} />
            </div>
        {/each}
    {/if}
</section>
