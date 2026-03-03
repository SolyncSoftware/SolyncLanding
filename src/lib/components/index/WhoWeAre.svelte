<script>
    const team = [
        {
            id: 30270106,
            displayName: 'TheCodingGuy',
            username: 'Aisuruneko',
            bio: 'I do things.'
        },
        {
            id: 72106503,
            displayName: 'J6papertek',
            username: 'papertek',
            bio: 'i am papertek! i usually work on designs, frontend, hardware, and hr. i also like doing whatever!'
        },
        {
            id: 36048627,
            displayName: 'DxT',
            username: 'RealDxT',
            bio: 'infrastructure person, chronic linux user & uncertified nerd'
        },
        {
            id: 141666866,
            displayName: 'oddbyte',
            username: 'oddbyte',
            bio: 'I mainly nerd about privacy, android, web development, cybersecurity, and sysadmin.'
        },
        {
            id: 65809047,
            displayName: 'Rotten',
            username: 'rottenspaceman',
            bio: "I like working on software and I like learning as well (also I'm a LAZY bum but that's not needed)"
        },
        {
            id: 177717694,
            displayName: 'Cookie',
            username: 'co00k1e',
            bio: 'Full stack developer: PHP / MYSQL / C#'
        },
        {
            id: 56894431,
            displayName: 'Gabriele P. Midulla',
            username: 'gabrielemidulla',
            bio: 'Fullstack Developer: TypeScript / PHP / SQL'
        },
        {
            id: 79934414,
            displayName: 'parakeet',
            username: 'parakeet-live',
            bio: 'parakeet (or para)'
        },
        {
            id: 90116898,
            displayName: 'Laith Hijazi',
            username: 'gapva',
            bio: 'software developer, game designer, musician, motion graphic artist, and OSS-supporter'
        },
        {
            id: 0,
            displayName: 'Joker',
            username: 'jokerlaul',
            bio: 'Accountant. I do not have a GitHub account, but I am a valuable member of the team nonetheless.'
        },
        {
            id: 65369281,
            displayName: 'flustix',
            username: 'flustix',
            bio: 'A rhythm game dev with a nanahira and choccy milk addiction.'
        }
    ];

    const members = team.map((member) => ({
        name: member.displayName || member.username,
        name2: member.username,
        bio: member.bio,
        href: member.id > 0 ? `https://github.com/${member.username}` : '#',
        avatarSrc: member.id > 0 ? `https://avatars.githubusercontent.com/u/${member.id}` : '/avatarplaceholder.svg'
    }));
</script>

<section>
    <span class="font-display text-[140px]"><span class="text-accent">WHO</span> WE ARE</span>

    <div class="flex flex-row flex-wrap items-start gap-8">
        {#each members as member}
            <a href={member.href} target="_blank" class="relative flex flex-row items-stretch gap-6 pt-5 pl-5">
                <div class="bg-accent absolute top-0 right-0 left-0 -z-10 h-9"></div>

                <img src={member.avatarSrc} alt={member.name} class="h-44 w-44 object-cover" />

                <div class="flex max-w-87 flex-col justify-between">
                    <span class="font-display truncate pt-10 pr-24 text-3xl text-white">
                        {member.name} <br /><span class="font-extralight">{member.name2}</span>
                    </span>
                    <div class="font-display text-accent truncate overflow-hidden pb-2 text-2xl font-semibold">{member.bio}</div>
                </div>
            </a>
        {/each}
    </div>
</section>
