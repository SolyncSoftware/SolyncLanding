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

<section class="flex flex-col gap-4">
    {#if sortedMembers.length === 0}
        <p class="text-xl text-black">No team members found!</p>
    {:else}
        {#each sortedMembers as member, i}
            <TeamCard {member} index={i} expanded={expandedIndex === i} onToggle={toggleBio} />
        {/each}
    {/if}
</section>
