<script>
    import { SiBluesky, SiGithub } from '@icons-pack/svelte-simple-icons';

    const team = [
        {
            id: 30270106,
            realName: 'Matthew',
            username: 'Aisuruneko',
            bio: 'I do things.'
        },
        {
            id: 72106503,
            realName: 'John',
            username: 'papertek',
            bio: 'i am papertek! i usually work on designs, frontend, hardware, and hr. i also like doing whatever!',
            bsky: 'j6chocomint.bsky.social'
        },
        {
            id: 36048627,
            realName: '"Dex"',
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
            bio: 'Full stack developer: PHP / MYSQL / C#'
        },
        {
            id: 79934414,
            realName: 'Ian',
            username: 'parakeet-live',
            bio: 'parakeet (or para)'
        },
        {
            id: 90116898,
            realName: 'Laith Hijazi',
            username: 'gapva',
            bio: 'software developer, game designer, musician, motion graphic artist, and OSS-supporter'
        },
        {
            id: 0,
            realName: 'Joker',
            username: 'jokerlaul',
            bio: 'Accountant. I do not have a GitHub account, but I am a valuable member of the team nonetheless.'
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
</script>

<section class="flex flex-col gap-4">
    <!-- todo: add dynamic bios and make links more flexible -->
    {#each members as member, i}
        <!-- the hover bg is placeholder -->
        <div class="flex flex-col gap-3 hover:bg-white/10">
            <div class="flex flex-row items-center justify-center gap-4 align-middle">
                <img class="h-19 w-19" loading="lazy" src={member.avatarSrc} alt={member.realName} />
                <p class="text-4xl font-bold">{member.realName}</p>
                <p class="text-2xl font-light">{member.username}</p>

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
                    <!-- {member.github} -->
                </div>
            </div>
            <p class="font-sans text-xl">
                {member.bio}
            </p>
        </div>
        <!-- da line -->
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
