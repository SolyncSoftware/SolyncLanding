<script lang="ts">
    import type { TransformedMember } from '../../../routes/api/team/+server.js';
    import { onMount } from 'svelte';
    import TeamCard from '../assets/TeamCard.svelte';

    let sortedMembers = $state<TransformedMember[]>([]);
    let loading = $state(true);

    onMount(async () => {
        const res = await fetch('/api/team'),
            members = await res.json();
        sortedMembers = [...members].filter((member) => member.showUser).sort((a, b) => a.realName.localeCompare(b.realName));
        loading = false;
    });

    let expandedIndex = $state<number | null>(null);

    function toggleBio(index: number) {
        expandedIndex = expandedIndex === index ? null : index;
    }
</script>

<section class="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
    {#if loading}
        <p class="text-xl">Loading team members...</p>
    {:else if sortedMembers.length === 0}
        <p class="text-xl text-black">No team members found!</p>
    {:else}
        {#each sortedMembers as member, i}
            <TeamCard {member} index={i} expanded={expandedIndex === i} onToggle={toggleBio} />
        {/each}
    {/if}
</section>
