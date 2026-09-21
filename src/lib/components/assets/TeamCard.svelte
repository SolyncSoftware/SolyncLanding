<!-- TeamCard.svelte -->
<script lang="ts">
    import type { TransformedMember } from '../../../routes/api/team/+server.js';
    import { SiBluesky, SiGithub } from '@icons-pack/svelte-simple-icons';
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
    class={`flex flex-col rounded-4xl bg-white/80 p-4 shadow-xl/4`}
>
    <div class={['group flex flex-row items-center gap-4 text-black', expanded ? 'text-accent' : 'text-black']}>
        <enhanced:img
            class={[
                'aspect-square h-auto w-16 rounded-2xl outline-2 transition',
                expanded ? 'outline-accent outline' : 'outline outline-transparent'
            ]}
            loading="lazy"
            src={member.avatarSrc}
            alt={member.realName}
        />
        <div class="flex flex-col text-left transition [&_p]:leading-[1em]">
            <p class="text-accent text-3xl font-bold md:text-left md:text-4xl">{member.username}</p>
            <p class="text-xl font-light md:text-left">{member.realName}</p>
        </div>

        <div class="ml-auto flex flex-row items-center gap-4 text-black">
            <div class="hidden flex-row gap-4 md:flex">
                {#if member.github !== '#'}
                    <a
                        href={member.github}
                        target="_blank"
                        class="hover:bg-accent rounded-full bg-white p-4 shadow-xl/6 transition-colors hover:text-white"
                        onclick={stopPropagation}
                    >
                        <SiGithub class="h-7 w-7" title="GitHub" />
                    </a>
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
            </div>

            <button
                onclick={handleToggle}
                class="bg-accent group cursor-pointer rounded-full p-4 px-4 py-2 shadow-xl/6 transition hover:bg-black md:px-8 md:py-6"
                class:bg-black={expanded}
                aria-label="arrow"
            >
                <img
                    src="/images/arrow-default.svg"
                    alt="Arrow"
                    class="h-4 w-8 overflow-hidden transition-transform duration-200"
                    class:rotate-180={expanded}
                    loading="lazy"
                />
            </button>
        </div>
    </div>
    <div
        class="grid transition-[grid-template-rows,opacity,margin] duration-300 ease-in-out {expanded
            ? 'mt-4 grid-rows-[1fr] opacity-100'
            : 'mt-0 grid-rows-[0fr] opacity-0'}"
    >
        <div class="flex flex-col gap-3 overflow-hidden">
            <p class="cursor-default text-left font-sans text-xl">
                {member.bio}
            </p>
            <div class="**:hover:text-accent flex flex-row items-center gap-2 duration-300 **:text-black/80 **:transition-colors md:hidden">
                {#if member.github !== '#'}
                    <a href={member.github} target="_blank" class="" onclick={stopPropagation}>
                        <SiGithub class="h-8 w-auto" title="GitHub" />
                    </a>
                {/if}
                {#if member.bluesky !== '#'}
                    <a href={member.bluesky} target="_blank" class="" onclick={stopPropagation}>
                        <SiBluesky class="mt-0.5 h-8 w-auto" title="Bluesky" />
                    </a>
                {/if}
            </div>
        </div>
    </div>
</div>
