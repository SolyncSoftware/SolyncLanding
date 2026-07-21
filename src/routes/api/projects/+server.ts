import { json } from '@sveltejs/kit';

interface SolyncProject {
    date: string;
    title: string;
    website?: string;
    image?: string;
    desc: string;
    github?: string;
    page?: string;
    showProject?: boolean;
}

// note: for dates we may want to use a more specific type or even a Date object, but for simplicity, we'll keep it as a string for now
// it can come later if we implement case study pages
const projectData: SolyncProject[] = [
    {
        date: '2024-12-05',
        title: 'Porter Robinson Wiki',
        website: 'https://potaro.wiki/',
        image: 'potaro.png',
        desc: 'Our debut started with Porter Robinson Wiki. A website created for showcasing modular wiki design and easy to use functionality unlike other wiki sites. We plan to replace this with our Gardens Wiki project.',
        github: 'porter-wiki-frontend'
        // page: 'potaro-wiki'
    },
    {
        date: '2024-12-20',
        title: '[PROTO EDEN]',
        website: 'https://proto-eden.com/',
        image: 'proto-eden.gif',
        desc: 'Before we were Solync, we helped make personal projects come to life by establishing connections with other developers.',
        github: 'proto-eden'
        // page: 'proto-eden'
    },
    {
        date: '2024-12-4',
        title: 'yell0w.net',
        website: 'https://yell0w.net/',
        image: 'yellow.png',
        desc: 'Before we were Solync, we helped make personal projects come to life by establishing connections with other developers.',
        github: 'dayellowwebsite'
        // page: 'yell0w-net'
    },
    {
        date: '2024-11-7',
        title: 'Theaceae Home',
        image: 'theaceaeSmileLogoMint.png',
        desc: 'Our old homepage before we rebranded to Solync.',
        github: 'theaceae-home',
        page: 'theaceae-home'
    },
    {
        date: '2025-10-1',
        title: 'Gardens Wiki',
        website: 'https://gardens.wiki/',
        image: 'gardens.png',
        desc: 'A user owned wiki builder/platform and social media site with a strong community-first focus for creative freedom.'
        // github: 'gardens-wiki',
        // page: 'gardens-wiki'
    },
    {
        date: '5-30-2026',
        title: 'KILLALLBOTS',
        image: 'killallbots.png',
        desc: 'A simple Discord moderation bot that bans users/bots when they select a specific role during onboarding.',
        github: 'KILLALLBOTS'
    },
    {
        date: '7-20-2026',
        title: 'IdeaLync',
        image: 'idealync.png',
        desc: 'A Discord bot that structures our pitch submissions, meetings, roles, and more.',
        github: 'IdeaLync'
    }
];

export interface TransformedProject {
    date: string;
    title: string;
    website: string;
    imageSrc: string;
    desc: string;
    github: string;
    page: string;
    showProject: boolean;
}

function transformProject(project: SolyncProject[]): TransformedProject[] {
    return project.map((proj) => ({
        date: proj.date,
        title: proj.title,
        website: proj.website ? proj.website : '#',
        imageSrc: proj.image ? `/images/projects/${proj.image}` : '/images/articles/fallback.png',
        desc: proj.desc,
        github: proj.github ? `https://github.com/SolyncSoftware/${proj.github}` : '#',
        page: proj.page ? `/projects/${proj.page}` : '#',
        showProject: proj.showProject !== false
    }));
}

export async function GET() {
    const projects = transformProject(projectData);
    return json(projects);
}
