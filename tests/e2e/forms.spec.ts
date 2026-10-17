import { expect, test } from './fixtures.js';
import applySchema from '../../src/lib/server/schema/apply.js';
import contactSchema from '../../src/lib/server/schema/contact.js';

const application = {
    name: 'Test Applicant',
    email: 'applicant@example.test',
    reason: 'referral',
    first:
        'I have built several small websites and tools for community groups, including a volunteer scheduling page and a public resource directory.',
    second:
        'I am currently learning more about frontend testing while helping maintain a few projects with friends and contributing to open source.',
    third:
        'My skills include TypeScript, HTML, CSS, Svelte, writing documentation, debugging user reports, and collaborating through code review.',
    fourth:
        'I am interested in Solync because the collective values user-first software, shared decisions, and learning by building useful things together. I would like to contribute and learn with the team.',
    portfolio: 'https://example.test/portfolio'
};

async function fill(page: import('@playwright/test').Page, values = application) {
    await page.getByLabel('Name', { exact: true }).fill(values.name);
    await page.getByLabel('Email', { exact: true }).fill(values.email);
    await page.getByLabel('How did you discover Solync?').selectOption(values.reason);
    await page.getByLabel(/What projects have you worked on/).fill(values.first);
    await page.getByLabel(/What are you doing now/).fill(values.second);
    await page.getByLabel(/What are your skills/).fill(values.third);
    await page.getByLabel(/Why are you interested in Solync/).fill(values.fourth);
    await page.getByLabel(/Portfolio \/ Website/).fill(values.portfolio);
}

test.describe('application form', () => {
    test('required fields block an empty submission', async ({ page }) => {
        await page.goto('/apply');
        await page.getByRole('button', { name: 'Send application' }).click();

        await expect(page.getByLabel('Name', { exact: true })).toBeFocused();
        await expect(page.getByRole('heading', { name: 'Apply now!' })).toBeVisible();
    });

    test('valid application submits to the app api and shows success', async ({ page }) => {
        let body = '';
        await page.route('**/api/apply', async (route) => {
            body = route.request().postData() ?? '';
            await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
        });
        await page.goto('/apply');
        await fill(page);
        await page.getByRole('button', { name: 'Send application' }).click();

        await expect(page.getByRole('heading', { name: 'Message sent!' })).toBeVisible();
        await expect(page.getByRole('button', { name: 'Send application' })).toHaveCount(0);
        expect(body).toContain('name="name"');
        expect(body).toContain('applicant@example.test');
    });

    test('application schema rejects short answers', () => {
        const result = applySchema.safeParse({
            name: application.name,
            email: application.email,
            reason: application.reason,
            message: application.portfolio,
            worked_on: 'too short',
            doing_now: 'too short',
            skills: 'too short',
            why_solync: 'too short'
        });

        expect(result.success).toBe(false);
    });

    test('api validation errors stay visible and leave the form usable', async ({ page }) => {
        await page.route('**/api/apply', (route) =>
            route.fulfill({ status: 400, contentType: 'application/json', body: '{"error":"invalid application"}' })
        );
        await page.goto('/apply');
        await fill(page);
        await page.getByRole('button', { name: 'Send application' }).click();

        await expect(page.getByText(/Something went wrong/)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Send application' })).toBeEnabled();
    });

    test('api errors show a retryable message', async ({ page }) => {
        await page.route('**/api/apply', (route) =>
            route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"service unavailable"}' })
        );
        await page.goto('/apply');
        await fill(page);
        await page.getByRole('button', { name: 'Send application' }).click();

        await expect(page.getByText(/Something went wrong/)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Send application' })).toBeEnabled();
    });

    test('invalid resume types are rejected in the browser', async ({ page }) => {
        await page.goto('/apply');
        await page.getByLabel(/Attach your resume/).setInputFiles({
            name: 'resume.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from('not a resume')
        });

        await expect(page.getByText('Please choose a .pdf, .doc, or .docx file.')).toBeVisible();
    });

    test('a resume can satisfy the portfolio requirement', async ({ page }) => {
        await page.route('**/api/apply', async (route) => {
            const body = route.request().postData() ?? '';
            expect(body).toContain('name="resume"');
            await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
        });
        await page.goto('/apply');
        await fill(page);
        await page.getByLabel(/Portfolio \/ Website/).fill('');
        await page.getByLabel(/Attach your resume/).setInputFiles({
            name: 'resume.pdf',
            mimeType: 'application/pdf',
            buffer: Buffer.from('test resume')
        });
        await page.getByRole('button', { name: 'Send application' }).click();

        await expect(page.getByRole('heading', { name: 'Message sent!' })).toBeVisible();
    });

    test('clearing a previously selected resume clears the submitted file', async ({ page }) => {
        let body = '';
        await page.route('**/api/apply', async (route) => {
            body = route.request().postData() ?? '';
            await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
        });
        await page.goto('/apply');
        await fill(page);
        const input = page.getByLabel(/Attach your resume/);
        await input.setInputFiles({ name: 'resume.pdf', mimeType: 'application/pdf', buffer: Buffer.from('resume') });
        await input.setInputFiles([]);
        await page.getByRole('button', { name: 'Send application' }).click();

        await expect(page.getByRole('heading', { name: 'Message sent!' })).toBeVisible();
        await expect(page.getByText('Please choose a .pdf, .doc, or .docx file.')).toHaveCount(0);
        expect(body).not.toContain('name="resume"');
    });
});

test.describe('contact form', () => {
    test('required fields block an empty submission', async ({ page }) => {
        await page.goto('/contact');
        await page.getByRole('button', { name: 'Send message' }).click();

        await expect(page.getByLabel('Name', { exact: true })).toBeFocused();
        await expect(page.getByRole('heading', { name: 'Contact us' })).toBeVisible();
    });

    test('valid service inquiry submits to the app api and shows success', async ({ page }) => {
        let body = '';
        await page.route('**/api/contact', async (route) => {
            body = route.request().postData() ?? '';
            await route.fulfill({ status: 200, contentType: 'application/json', body: '{"success":true}' });
        });
        await page.goto('/contact?service=landing-page-creation');
        await page.getByLabel('Name', { exact: true }).fill('Test Contact');
        await page.getByLabel('Email', { exact: true }).fill('contact@example.test');
        await page.getByLabel('Reason for contact').selectOption('landing-page-creation');
        await page.getByLabel('Message').fill('I would like to talk about a small site for my project.');
        await page.getByRole('button', { name: 'Send message' }).click();

        await expect(page.getByRole('heading', { name: 'Message sent!' })).toBeVisible();
        expect(JSON.parse(body)).toMatchObject({ reason: 'landing-page-creation' });
    });

    test('api errors keep the contact form available for retry', async ({ page }) => {
        await page.route('**/api/contact', (route) =>
            route.fulfill({ status: 503, contentType: 'application/json', body: '{"error":"service unavailable"}' })
        );
        await page.goto('/contact');
        await page.getByLabel('Name', { exact: true }).fill('Test Contact');
        await page.getByLabel('Email', { exact: true }).fill('contact@example.test');
        await page.getByLabel('Reason for contact').selectOption('other');
        await page.getByLabel('Message').fill('A test message for retry handling.');
        await page.getByRole('button', { name: 'Send message' }).click();

        await expect(page.getByText(/Something went wrong/)).toBeVisible();
        await expect(page.getByRole('button', { name: 'Send message' })).toBeEnabled();
    });

    test('contact schema rejects invalid payloads', () => {
        const result = contactSchema.safeParse({
            name: '',
            email: 'nope',
            reason: 'other',
            message: ''
        });

        expect(result.success).toBe(false);
    });

    test('form controls have unique ids, names, and associated labels', async ({ page }) => {
        for (const path of ['/apply', '/contact']) {
            await page.goto(path);
            const result = await page.locator('form').evaluate((form) => {
                const controls = [
                    ...form.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>('input, textarea, select')
                ];
                const ids = controls.map((control) => control.id);

                return {
                    named: controls.every((control) => control.name.length > 0),
                    labels: controls.every((control) => control.labels?.length),
                    unique: new Set(ids).size === ids.length
                };
            });

            expect(result.named).toBeTruthy();
            expect(result.labels).toBeTruthy();
            expect(result.unique).toBeTruthy();
        }
    });

    for (const reason of [
        'support',
        'question',
        'landing-page-creation',
        'brochure-website-creation',
        'deployment-hosting',
        'static-hosting',
        'website-creation',
        'hosting',
        'partners',
        'trust-and-safety',
        'other'
    ]) {
        test(`contact schema accepts the ${reason} reason offered in the form`, () => {
            const result = contactSchema.safeParse({
                name: 'Test Contact',
                email: 'contact@example.test',
                reason,
                message: 'A test message for this contact reason.'
            });

            expect(result.success).toBe(true);
        });
    }
});
