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
    class="flex flex-col rounded-4xl bg-white/80 p-4 shadow-xl/4"
>
    <div
        class={[
            'group flex flex-col items-start justify-center gap-4 align-middle text-black md:flex-row md:items-center',
            expanded ? 'text-accent' : 'text-black'
        ]}
    >
        <enhanced:img
            class={['h-19 w-19 rounded-3xl outline-2 transition', expanded ? 'outline-accent outline' : 'outline outline-transparent']}
            loading="lazy"
            src={member.avatarSrc}
            alt={member.realName}
        />
        <div class="flex flex-col text-left transition">
            <p class="text-accent text-center text-4xl font-bold md:text-left">{member.username}</p>
            <p class="text-center text-2xl font-light md:text-left">{member.realName}</p>
        </div>

        <div class="mb-4 flex flex-row items-center gap-4 text-black md:mb-0 md:ml-auto">
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

            <button
                onclick={handleToggle}
                class="bg-accent group cursor-pointer rounded-full px-8 py-6 shadow-xl/6 transition hover:bg-black"
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

    <p
        class={[
            'cursor-default text-left font-sans text-xl transition-all duration-300 ease-in-out md:pl-23',
            expanded ? 'max-h-96 leading-6 opacity-100' : 'max-h-0 leading-0 opacity-0'
        ]}
    >
        {member.bio}
    </p>
</div>
