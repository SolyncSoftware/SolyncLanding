import { expect, test } from './fixtures.js';

const pages = [
    { path: '/', heading: 'Building what comes next' },
    { path: '/about', heading: "We're just getting started." },
    { path: '/services', heading: 'See what we offer (so far).' },
    { path: '/apply', heading: 'Applying to Solync.' },
    { path: '/contact', heading: 'Contacting Solync.' },
    { path: '/donate', heading: 'Build a better Solync.' },
    { path: '/blog', heading: 'Latest Articles.' },
    { path: '/blog/introducing-solynchosting', heading: 'Introducing Solync Hosting' },
    { path: '/legal/privacy', heading: 'Privacy Policy' },
    { path: '/legal/terms', heading: 'Terms of Service' }
];

for (const route of pages) {
    test(`${route.path || 'home'} renders`, async ({ page }) => {
        const response = await page.goto(route.path);

        expect(response?.status()).toBe(200);
        await expect(page.locator('main')).toContainText(route.heading);
        await expect(page).toHaveTitle(/Solync/);
    });
}

test('unknown article paths return a not found page', async ({ page }) => {
    const response = await page.goto('/blog/not-a-real-article');

    expect(response?.status()).toBe(404);
});

test('homepage content APIs return usable data', async ({ request }) => {
    const [article, project, crew] = await Promise.all([
        request.get('/api/articles?type=blog'),
        request.get('/api/projects'),
        request.get('/api/team')
    ]);

    expect(article.ok()).toBeTruthy();
    expect(project.ok()).toBeTruthy();
    expect(crew.ok()).toBeTruthy();

    const articles = await article.json();
    const projects = await project.json();
    const team = await crew.json();

    expect(articles.length).toBeGreaterThan(0);
    expect(articles.every((article: { slug: string }) => article.slug.startsWith('blog/'))).toBeTruthy();
    expect(projects.some((project: { title: string }) => project.title === 'Gardens Wiki')).toBeTruthy();
    expect(team.some((member: { username: string }) => member.username === 'papertek')).toBeTruthy();
});
