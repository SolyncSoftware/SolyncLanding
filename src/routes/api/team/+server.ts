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
        id: 285055260,
        realName: 'Joel',
        username: 'jokerlaul',
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
        id: 155797753,
        realName: 'Team Solync',
        username: '@SolyncSoftware',
        bio: 'The Solync Organization account',
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
