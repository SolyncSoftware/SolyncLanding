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
        bio: 'i am papertek! i usually work on designs, websites, hardware, human resources, and public relations. i also like experimenting and iterating on whatever comes to mind!'
    },
    {
        id: 65809047,
        realName: 'Amal',
        username: 'rottenspaceman',
        bsky: 'rottenspaceman.bsky.social',
        bio: "I like working on software and I like learning as well (also I'm a LAZY bum but that's not needed)"
    },
    {
        id: 177717694,
        realName: 'Spencer',
        username: 'co00k1e',
        bio: 'Spencer is a full stack developer whos really good at PHP, MYSQL, C#. He is also a big fan of tea time because he was caught making tea during meetings.'
    },
    {
        id: 151549235,
        realName: 'Mr. Pasta',
        username: 'pastaya',
        github: 'pastadudes',
        bsky: 'pastaya.dev',
        bio: 'emacs warrior #67 and knows how to program 75% of the time'
    },
    {
        id: 102817779,
        realName: 'Sup',
        username: 'Sup#2.0',
        github: 'Sup2point0',
        bio: 'jack of all knives, none of a kind, kind of a none, just having fun ^v^'
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
        id: 294897079,
        realName: 'fritz',
        username: 'fritzbear',
        github: 'fritzer1',
        bio: 'umm hi im fritz. new bio: passionate and inspiring'
    },
    {
        id: 65217023,
        realName: 'Buby',
        username: 'almahbuby',
        github: 'almahbubyanwar',
        bsky: 'nekobuby.bsky.social',
        bio: "i'm a computer science student who mostly does JS/TS frontend dev, as well as UI/UX and graphic design. shoutouts to fonts btw"
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
