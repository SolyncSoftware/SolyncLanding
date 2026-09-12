<!-- TeamCard.svelte -->
<script lang="ts">
    import type { TransformedMember } from '../../../routes/api/team/+server.js';
    import { SiBluesky, SiGithub } from '@icons-pack/svelte-simple-icons';
    import { ChevronDown } from '@lucide/svelte';
    import { slide, fade } from 'svelte/transition';
    import rs from 'rune-scroller';

    let { member, index, expanded, onToggle } = $props<{
        member: TransformedMember;
        index: number;
        expanded: boolean;
        onToggle: (index: number) => void;
    }>();

    function handleToggle() {
        onToggle(index);
    }

    function stopPropagation(e: MouseEvent) {
        e.stopPropagation();
    }
</script>

<div
    use:rs={{
        animation: 'fade-up',
        duration: 600,
        repeat: false
    }}
    class="flex flex-col rounded-3xl bg-white/80 p-3 shadow-xl/4"
>
    <div
        class={[
            'group flex flex-row items-center gap-3 text-black',
            expanded ? 'text-accent' : 'text-black'
        ]}
    >
        <enhanced:img
            class={['w-14 aspect-square rounded-xl outline-2 transition', expanded ? 'outline-accent outline' : 'outline outline-transparent']}
            loading="lazy"
            src={member.avatarSrc}
            alt={member.realName}
        />
        <div class="flex flex-col text-left justify-start transition">
            <p class="leading-[1em] text-3xl font-semibold md:text-left">{member.username}</p>
            {#if expanded}
                <div transition:slide={{duration:300}}>
                    <p
                        transition:fade={{ duration: 300}}
                        class="leading-[1em] text-2xl font-light md:text-left"
                    >{member.realName}</p>
                </div>
            {/if}
        </div>
        <button
            onclick={handleToggle}
            class="text-accent group cursor-pointer transition ml-auto"
            aria-label="arrow"
        >
            <!-- <img
                src="/images/arrow-default.svg"
                alt="Arrow"
                class="h-4 w-8 overflow-hidden transition-transform duration-400 stroke-current text-accent"
                class:rotate-180={expanded}
                loading="lazy"
            /> -->
            <div
                class:rotate-180={expanded}
                class="transition-transform duration-300 ml-auto mr-1"
            >
                <ChevronDown
                    class="text-accent hover:text-accent/60 transition-colors"
                    size={36}/>
            </div>
        </button>

        <!-- <div class="mb-4 flex flex-row items-center gap-4 text-black md:mb-0 md:ml-auto">
            {#if member.github !== '#'}

            {/if}
            {#if member.bluesky !== '#'}
                <a
                    href={member.bluesky}
                    target="_blank"
                    class="hover:bg-accent rounded-full bg-white p-4 shadow-xl/6 transition-colors hover:text-white"
                    onclick={stopPropagation}
                >
                    <SiBluesky class="h-7 w-7" title="Bluesky" />
                </a>
            {/if}
        </div> -->
    </div>

    {#if expanded}
    <div class="overflow-hidden mt-3" transition:slide={{duration:300}}>
        <div transition:fade={{duration:300}} class="flex flex-col gap-2">
            <p class="cursor-default text-left font-sans text-xl">
                {member.bio}
            </p>
            <div class="flex flex-row gap-2 items-center">
                <a
                    href={member.github}
                    target="_blank"
                    class=""
                    onclick={stopPropagation}
                >
                    <SiGithub class="h-8 w-auto text-black hover:text-black/60 transition-colors" title="GitHub" />
                </a>
                <a
                    href={member.bluesky}
                    target="_blank"
                    class=""
                    onclick={stopPropagation}
                >
                    <SiBluesky class="h-8 w-auto text-black hover:text-black/60 transition-colors mt-0.5" title="Bluesky" />
                </a>
            </div>
        </div>
    </div>
    {/if}
</div>
