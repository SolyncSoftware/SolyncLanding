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
        bio: 'i am papertek! i usually work on designs, websites, hardware, human resources, and public relations. i also like experimenting and iterating on whatever comes to mind!',
        bsky: 'j6chocomint.bsky.social'
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
        id: 109701210,
        realName: 'Joel',
        username: 'jokerlaul',
        github: 'thejokerlol9785',
        bio: 'Hello! Mainly an accountant, but not afraid of the unknown!'
    },
    {
        id: 141666866,
        realName: 'Leon',
        username: 'oddbyte',
        bio: 'Leon describes himself as "just a goober who does things" but we see him being obsessed with security and his work. He\'s a full stack developer and a fan of Bazzite Linux.'
    },
    {
        id: 50887230,
        realName: 'Alex',
        username: 'xela.codes',
        github: 'itzthemeow',
        bio: 'stupid coding nerd who knows a few things'
    },
    {
        id: 151549235,
        realName: 'Mr. Pasta',
        username: 'pastaya',
        github: 'pastadudes',
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
        bio: "I'm a designer and developer from the UK, working on projects such as osu!, UNTONE, Osekai, and many more. In my spare time, I also work on 3D art and character design, and I dabble a bit in music and electronics."
    },
    {
        id: 294897079,
        realName: 'Leafy',
        username: 'fritzbear',
        github: 'fritzer1',
        bio: 'i am fritz'
    },
    {
        id: 155797753,
        realName: 'Team Solync',
        username: '@SolyncSoftware',
        bio: 'The Solync account',
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
