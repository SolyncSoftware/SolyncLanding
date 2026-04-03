<script>
    import { SiBluesky, SiDiscord, SiGithub } from '@icons-pack/svelte-simple-icons';

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
            bio: 'i am papertek! i usually work on designs, frontend, hardware, and hr. i also like doing whatever!'
        },
        {
            id: 36048627,
            realName: '"Dexter"',
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
            id: 56894431,
            realName: 'Gabriele',
            username: 'gabrielemidulla',
            bio: 'Fullstack Developer: TypeScript / PHP / SQL'
        },
        {
            id: 79934414,
            realName: 'Para',
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
        href: member.id > 0 ? `https://github.com/${member.username}` : '#',
        avatarSrc: member.id > 0 ? `https://avatars.githubusercontent.com/u/${member.id}` : '/avatarplaceholder.svg'
    }));
</script>

<section>
    <!-- todo: make it 1:1 to design. also make the links flexible and stuff -->
    {#each members as member}
        <div class="flex flex-row items-center gap-4">
            <img class="h-19 w-19" loading="lazy" src={member.avatarSrc} alt={member.realName} />
            <p class="text-4xl font-bold">{member.realName}</p>
            <p class="text-2xl font-light">{member.username}</p>

            <div class="ml-auto flex flex-row items-center gap-4">
                <a href="https://github.com/papertek" target="_blank" class="hover:text-gray-400">
                    <SiGithub class="h-7 w-7" />
                </a>
                <a href="https://bsky.app/profile/j6chocomint.bsky.social" target="_blank" class="hover:text-gray-400">
                    <SiBluesky class="h-7 w-7" />
                </a>
                <!-- {member.href} -->
            </div>
        </div>
        <p class="mt-3 font-sans text-xl">
            {member.bio}
        </p>
        <div class="mt-4 h-px w-full bg-white/15"></div>
    {/each}
</section>
