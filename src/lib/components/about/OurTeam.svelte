<script lang="ts">
    import { SiBluesky, SiGithub } from '@icons-pack/svelte-simple-icons';

    const team = [
        {
            id: 30270106,
            realName: 'Matthew',
            username: 'Aisuruneko',
            bio: 'Matthew founded the company in 2022. He is a full stack developer and he really enjoys NetroHost, his passion project. Give him a hug!'
        },
        {
            id: 72106503,
            realName: 'John',
            username: 'papertek',
            bio: 'i am papertek! i usually work on designs, websites, hardware, human resources, and public relations. i also like experimenting and iterating on whatever comes to mind!',
            bsky: 'j6chocomint.bsky.social'
        },
        {
            id: 36048627,
            realName: 'Dex',
            username: 'RealDxT',
            bio: 'infrastructure person, chronic linux user & uncertified nerd'
        },
        {
            id: 65809047,
            realName: 'Amal',
            username: 'rottenspaceman',
            bio: "I like working on software and I like learning as well (also I'm a LAZY bum but that's not needed)"
        },
        {
            id: 177717694,
            realName: 'Spenser',
            username: 'co00k1e',
            bio: 'Spenser is a full stack developer whos really good at PHP, MYSQL, C#. He is also a big fan of tea time because he was caught making tea during meetings.'
        },
        {
            id: 79934414,
            realName: 'Ian',
            username: 'parakeet-live',
            bio: 'Ian is a software developer who enjoys working on games and backend. He created Novarin and is also a fan of Just Dance.'
        },
        {
            id: 90116898,
            realName: 'Laith Hijazi',
            username: 'gapva',
            bio: 'Laith is a software developer, game designer, musician, motion graphic artist, and OSS-supporter. He is known for his work on Super Mario 127, Novastra, and Rhythia.'
        },
        {
            id: 0,
            realName: 'Joel',
            username: 'jokerlaul',
            bio: "I'm the accountant. I do not have a GitHub account, but I am a valuable member of the team nonetheless."
        },
        {
            id: 65369281,
            realName: 'Jason',
            username: 'flustix',
            bio: 'A rhythm game dev with a nanahira and choccy milk addiction.'
        }
    ];

    const members = team.map((member) => ({
        realName: member.realName,
        username: member.username,
        bio: member.bio,
        bluesky: member.bsky ? `https://bsky.app/profile/${member.bsky}` : '#',
        github: member.id > 0 ? `https://github.com/${member.username}` : '#',
        avatarSrc: member.id > 0 ? `https://avatars.githubusercontent.com/u/${member.id}` : '/avatarplaceholder.svg'
    }));

    let sortedMembers = [...members].sort((a, b) => a.realName.localeCompare(b.realName));

    let expandedIndex = $state(null);
    function toggleBio(i: any) {
        expandedIndex = expandedIndex === i ? null : i;
    }
</script>

<section class="flex flex-col gap-4">
    <!-- todo: make links more flexible -->
    {#each sortedMembers as member, i}
        <div class="flex flex-col">
            <div class="flex flex-row items-center justify-center gap-4 align-middle">
                <img class="h-19 w-19" loading="lazy" src={member.avatarSrc} alt={member.realName} />
                <button
                    onclick={() => toggleBio(i)}
                    class="hover:text-accent flex cursor-pointer flex-row items-end gap-4 text-left transition"
                    class:text-white={expandedIndex !== i}
                    class:text-accent={expandedIndex === i}
                >
                    <p class="text-4xl font-bold">{member.realName}</p>
                    <p class="text-2xl font-light">{member.username}</p>
                </button>

                <div class="ml-auto flex flex-row items-center gap-4">
                    {#if member.github !== '#'}
                        <a href={member.github} target="_blank" class="hover:text-gray-400">
                            <SiGithub class="h-7 w-7" title="GitHub" />
                        </a>
                    {/if}
                    {#if member.bluesky !== '#'}
                        <a href={member.bluesky} target="_blank" class="hover:text-gray-400">
                            <SiBluesky class="h-7 w-7" title="Bluesky" />
                        </a>
                    {/if}
                </div>
            </div>
            <p
                class="pl-23 text-left font-sans text-xl transition-all duration-300 ease-in-out"
                class:opacity-0={expandedIndex !== i}
                class:opacity-100={expandedIndex === i}
                class:max-h-0={expandedIndex !== i}
                class:max-h-96={expandedIndex === i}
                class:leading-0={expandedIndex !== i}
                class:leading-6={expandedIndex === i}
            >
                {member.bio}
            </p>
        </div>
        {#if i < members.length - 1}
            <hr class="text-white/15" />
        {/if}
    {/each}
    <div class="mt-12 flex flex-row items-center justify-end gap-6 text-xl">
        <span class="font-bold">Think you'd be a good addition?</span>
        <a href="/apply" class="bg-accent hover:bg-accent/70 flex items-center gap-4 py-4 pr-4 pl-7 font-bold">
            JOIN NETRO<img src="/arrow-default.png" alt="arrow pointing down" />
        </a>
    </div>
</section>
