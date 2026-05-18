<script lang="ts">
    import { SiBluesky, SiGithub } from '@icons-pack/svelte-simple-icons';
    import { onMount } from 'svelte';
    import type { TransformedMember } from '../../../routes/api/team/+server.js';
    import Button from '../Button.svelte';

    type memberGroup = {
        role: string;
        members: TransformedMember[];
    };

    let roleGroups = $state<memberGroup[]>([]);
    let loading = $state(true);

    onMount(async () => {
        const res = await fetch('/api/team');
        const members: TransformedMember[] = await res.json();
        const visibleMembers = members.filter((m) => m.showUser).sort((a, b) => a.realName.localeCompare(b.realName));

        const groupsMap = new Map<string, TransformedMember[]>();
        for (const member of visibleMembers) {
            const role = member.role;
            if (!groupsMap.has(role)) groupsMap.set(role, []);
            groupsMap.get(role)!.push(member);
        }

        const sortedGroups = Array.from(groupsMap.entries())
            .map(([role, members]) => ({ role, members }))
            .sort((a, b) => {
                // shit
                if (a.role === 'Other Members') return 1;
                if (b.role === 'Other Members') return -1;
                return a.role.localeCompare(b.role);
            });

        roleGroups = sortedGroups;
        loading = false;
    });

    let expandedIndex = $state<string | null>(null);
    function toggleBio(username: string) {
        expandedIndex = expandedIndex === username ? null : username;
    }

    function stopPropagation(e: MouseEvent) {
        e.stopPropagation();
    }
</script>

<section class="flex flex-col gap-4">
    <!-- todo: make links more flexible -->
    <p class="text-lg opacity-90">Click a team member to view their bio!</p>
    {#if loading}
        <p class="text-xl">Loading team members...</p>
    {:else if roleGroups.length === 0}
        <p class="text-xl text-gray-400">No team members found!</p>
    {:else}
        {#each roleGroups as { role, members }}
            <div class="role-group">
                <h2 class="mt-8 mb-4 text-3xl font-bold uppercase">{role}</h2>
                <div class="flex flex-col gap-4">
                    {#each members as member, i}
                        <div class="flex flex-col">
                            <button
                                onclick={() => toggleBio(member.username)}
                                class={[
                                    'hover:text-accent group flex cursor-pointer flex-col items-start justify-center gap-4 align-middle md:flex-row md:items-center',
                                    expandedIndex === member.username ? 'text-accent' : 'text-white'
                                ]}
                            >
                                <img
                                    class={[
                                        'h-19 w-19 outline-2 transition',
                                        expandedIndex === member.username
                                            ? 'outline-accent outline'
                                            : 'group-hover:outline-accent outline outline-transparent'
                                    ]}
                                    loading="lazy"
                                    src={member.avatarSrc}
                                    alt={member.realName}
                                />
                                <div class="flex flex-col text-left transition md:flex-row md:items-end md:gap-4">
                                    <p class="text-4xl font-bold">{member.realName}</p>
                                    <p class="text-2xl font-light">{member.username}</p>
                                </div>

                                <div class="mb-4 flex flex-row items-center gap-4 text-white md:mb-0 md:ml-auto">
                                    {#if member.github !== '#'}
                                        <a
                                            href={member.github}
                                            target="_blank"
                                            class="hover:text-accent transition-colors"
                                            onclick={stopPropagation}
                                        >
                                            <SiGithub class="h-7 w-7" title="GitHub" />
                                        </a>
                                    {/if}
                                    {#if member.bluesky !== '#'}
                                        <a
                                            href={member.bluesky}
                                            target="_blank"
                                            class="hover:text-accent transition-colors"
                                            onclick={stopPropagation}
                                        >
                                            <SiBluesky class="h-7 w-7" title="Bluesky" />
                                        </a>
                                    {/if}
                                </div>
                            </button>
                            <p
                                class={[
                                    'cursor-default text-left font-sans text-xl transition-all duration-300 ease-in-out md:pl-23',
                                    expandedIndex === member.username ? 'max-h-96 leading-6 opacity-100' : 'max-h-0 leading-0 opacity-0'
                                ]}
                            >
                                {member.bio}
                            </p>
                        </div>
                        {#if i < members.length - 1}
                            <hr class="text-white/15" />
                        {/if}
                    {/each}
                </div>
            </div>
        {/each}
    {/if}
    <div class="mt-12 flex flex-col justify-end gap-6 text-xl md:flex-row md:items-center">
        <span class="font-bold">Think you'd be a good addition?</span>
        <Button href="/apply" text="JOIN NETRO" class="text-xl" />
    </div>
</section>
