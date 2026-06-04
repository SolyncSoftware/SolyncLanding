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
        date: '2024-06-01',
        title: 'test project',
        website: 'https://example.com',
        image: '/images/banner.png',
        desc: 'cool description or whatever',
        github: 'SolyncLanding'
    },
    {
        date: '2024-06-01',
        title: 'Cool Project Name',
        // website: 'https://example.com',
        desc: 'Cool relatively short description of what the project does, 2-3 lines maybe 4 max, it’s okay if it’s a bit longer but try to keep it concise and engaging to attract users to check out the project.'
        // page: 'cool-project-name'
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
        imageSrc: proj.image || '/images/articles/fallback.png',
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
