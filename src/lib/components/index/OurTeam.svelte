<script lang="ts">
    import type { TransformedMember } from '../../../routes/api/team/+server.js';
    import { onMount } from 'svelte';
    import { SiBluesky, SiGithub } from '@icons-pack/svelte-simple-icons';

    let sortedMembers = $state<TransformedMember[]>([]);
    let loading = $state(true);

    onMount(async () => {
        const res = await fetch('/api/team'),
            members = await res.json();
        sortedMembers = [...members].filter((member) => member.showUser).sort((a, b) => a.realName.localeCompare(b.realName));
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
    {#if loading}
        <p class="text-xl">Loading team members...</p>
    {:else if sortedMembers.length === 0}
        <p class="text-xl text-black">No team members found!</p>
    {:else}
        {#each sortedMembers as member, i}
            <div class="flex flex-col rounded-4xl bg-white p-4 shadow-xl/4">
                <div
                    class={[
                        'group flex flex-col items-start justify-center gap-4 align-middle md:flex-row md:items-center',
                        expandedIndex === i ? 'text-accent' : 'text-black'
                    ]}
                >
                    <img
                        class={[
                            'h-19 w-19 rounded-3xl outline-2 transition',
                            expandedIndex === i ? 'outline-accent outline' : 'outline outline-transparent'
                        ]}
                        loading="lazy"
                        src={member.avatarSrc}
                        alt={member.realName}
                    />
                    <div class="flex flex-col text-left transition">
                        <p class="text-accent text-4xl font-bold">{member.username}</p>
                        <p class="text-2xl font-light">{member.realName}</p>
                    </div>

                    <div class="mb-4 flex flex-row items-center gap-4 text-black md:mb-0 md:ml-auto">
                        {#if member.github !== '#'}
                            <a
                                href={member.github}
                                target="_blank"
                                class="hover:bg-accent bg-offwhite/70 rounded-full p-4 shadow-xl/6 transition-colors hover:text-white"
                                onclick={stopPropagation}
                            >
                                <SiGithub class="h-7 w-7" title="GitHub" />
                            </a>
                        {/if}
                        {#if member.bluesky !== '#'}
                            <a
                                href={member.bluesky}
                                target="_blank"
                                class="hover:bg-accent bg-offwhite/70 rounded-full p-4 shadow-xl/6 transition-colors hover:text-white"
                                onclick={stopPropagation}
                            >
                                <SiBluesky class="h-7 w-7" title="Bluesky" />
                            </a>
                        {/if}

                        <button
                            onclick={() => toggleBio(i)}
                            class="bg-accent group cursor-pointer rounded-full px-8 py-6 shadow-xl/6 transition hover:bg-black"
                            class:bg-black={expandedIndex === i}
                        >
                            <img
                                src="/images/arrow-default.svg"
                                alt="Arrow"
                                class="h-4 w-8 overflow-hidden transition-transform duration-200"
                                class:rotate-180={expandedIndex === i}
                            />
                        </button>
                    </div>
                </div>
                <p
                    class={[
                        'cursor-default text-left font-sans text-xl transition-all duration-300 ease-in-out md:pl-23',
                        expandedIndex == i ? 'max-h-96 leading-6 opacity-100' : 'max-h-0 leading-0 opacity-0'
                    ]}
                >
                    {member.bio}
                </p>
            </div>
        {/each}
    {/if}
    <!-- <div class="mt-12 flex flex-col justify-end gap-6 text-xl md:flex-row md:items-center">
        <span class="font-bold">Think you'd be a good addition?</span>
        <Button href="/apply" text="JOIN SOLYNC" class="text-xl" />
    </div> -->
</section>
