import { json } from '@sveltejs/kit';

interface TeamMember {
    id: number;
    realName: string;
    username: string;
    bio: string;
    github?: string;
    bsky?: string;
    showUser?: boolean;
}

const teamData: TeamMember[] = [
    {
        id: 72106503,
        realName: 'John',
        username: 'papertek',
        bsky: 'j6chocomint.bsky.social',
        bio: "i am papertek! I'm usually working on designs, business, websites, hardware, human resources, and public relations. i also like experimenting and iterating on whatever comes to mind! you may know me from projects like Porter Robinson Wiki and the original Camellia Wiki."
    },
    {
        id: 65809047,
        realName: 'Amal',
        username: 'rottenspaceman',
        bsky: 'rottenspaceman.bsky.social',
        bio: 'Software engineer currently doing my masters in computer science. I love my low level programming and full stack development too (jack of all trades, master of some).'
    },
    {
        id: 177717694,
        realName: 'Spencer',
        username: 'co00k1e',
        bio: 'Spencer is a full stack developer whos really good at PHP, MYSQL, C#. He is also a big fan of tea time because he was caught making tea during meetings.'
    },
    {
        id: 151549235,
        realName: 'Mohanned',
        username: 'pastaya',
        github: 'pastadudes',
        bsky: 'pastaya.dev',
        bio: 'German-branded GNU Emacs zealot. I\'m the Nix guy around here, and I also enjoy high-level and low-level programming like C++, and I dabble in Elixir and other FP languages. My C++ knowledge is probably pretty respectable on the Bjarne Scale. As Alan J. Perlis once said: "A language that doesn\'t affect the way you think about programming, is not worth knowing."'
    },
    {
        id: 33783503,
        realName: 'Archie',
        username: 'Tanza',
        github: 'Tanza3D',
        bsky: 'tanza.me',
        bio: "I'm a designer and developer from the UK, working on projects such as osu!, UNTONE, Osekai, and many more. In my spare time, I also work on 3D art and character design, and I dabble a bit in music and electronics."
    },
    {
        id: 65217023,
        realName: 'Buby',
        username: 'almahbuby',
        github: 'almahbubyanwar',
        bsky: 'nekobuby.bsky.social',
        bio: "I'm a computer science student who mostly does JS/TS frontend dev, as well as UI/UX and graphic design. I like learning."
    },
    {
        id: 145165822,
        realName: 'Maya',
        username: 'λx.Maya',
        github: 'MayaChen350',
        bsky: 'giratina-shiny.bsky.social',
        bio: "Maya is someone who's very passionate and curious about programming, shes interested in everything about it! Ask her about something she knows, and she will keep you busy for 40 minutes, not that we're complaining! She also found it really interesting how open Solync is. She started asking many questions as a result, so we had to dust off our internal documentation to keep up."
    },
    {
        id: 45880278,
        realName: 'Lizzy',
        username: 'LizzyTheWitch',
        github: 'LizAinslie',
        bsky: 'mey.yuri.capital',
        bio: 'Full-stack, backend & Kotlin engineer passionate about decentralized, privacy focused technology and user freedom. Obsessed with polish & performance. In my free time I like playing games & watching anime with my friends, reading manga, and making music.'
    },
    {
        id: 64609869,
        realName: 'Ellie',
        username: 'p1k0chu',
        github: 'p1k0chu',
        bsky: 'p1kachu.bsky.social',
        bio: "Hi, I'm Ellie! I am a self-taught passionate software engineer from Ukraine. Big fan of Kotlin, I live in the terminal. I like poetry and listen to music all the time!"
    },
    {
        id: 155797753,
        realName: 'Team Solync',
        username: 'Solync',
        bio: 'The Solync user',
        showUser: false
    }
];

export interface TransformedMember {
    realName: string;
    username: string;
    bio: string;
    bluesky: string;
    github: string;
    avatarSrc: string;
    showUser: boolean;
}

function transformTeam(team: TeamMember[]): TransformedMember[] {
    return team.map((member) => ({
        realName: member.realName,
        username: member.username,
        bio: member.bio,
        bluesky: member.bsky ? `https://bsky.app/profile/${member.bsky}` : '#',
        github: member.id > 0 ? `https://github.com/${member.github || member.username}` : '#',
        avatarSrc: member.id > 0 ? `https://avatars.githubusercontent.com/u/${member.id}` : '/images/avatarplaceholder.svg',
        showUser: member.showUser !== false
    }));
}

export async function GET() {
    const team = transformTeam(teamData);
    return json(team);
}
