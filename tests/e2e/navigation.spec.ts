import { expect, test } from './fixtures.js';

test.describe('desktop navigation', () => {
    test.use({ viewport: { width: 1280, height: 900 } });

    test('learn more menu opens and navigates to services', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Learn more' }).click();

        const menu = page.getByRole('navigation', { name: 'Learn more' });
        await expect(menu).toBeVisible();
        await menu.getByRole('link', { name: 'Services' }).click();

        await expect(page).toHaveURL(/\/services$/);
        await expect(page.getByRole('heading', { name: 'See what we offer (so far).' })).toBeVisible();
    });

    test('clicking outside closes learn more menu', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Learn more' }).click();

        const menu = page.getByRole('navigation', { name: 'Learn more' });
        await expect(menu).toBeVisible();
        await page.locator('main').click({ position: { x: 10, y: 10 } });
        await expect(menu).toBeHidden();
    });
});

test.describe('mobile navigation', () => {
    test.use({ viewport: { width: 390, height: 844 } });

    test('menu opens, navigates, and closes', async ({ page }) => {
        await page.goto('/');
        const toggle = page.getByRole('button', { name: 'Open navigation menu' });
        await toggle.click();

        const menu = page.locator('#mobile-menu');
        await expect(menu).toBeVisible();
        await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
        await menu.getByRole('link', { name: 'Apply' }).click();

        await expect(page).toHaveURL(/\/apply$/);
        await expect(page.locator('#mobile-menu')).toBeHidden();
        await expect(page.getByRole('heading', { name: 'Applying to Solync.' })).toBeVisible();
    });

    test('close button dismisses the menu', async ({ page }) => {
        await page.goto('/');
        await page.getByRole('button', { name: 'Open navigation menu' }).click();
        await page.getByRole('button', { name: 'Close menu' }).click();

        await expect(page.locator('#mobile-menu')).toBeHidden();
    });
});

test('team card expands and collapses with its toggle', async ({ page }) => {
    await page.goto('/');

    const card = page.locator('section').filter({ hasText: 'papertek' }).first();
    const toggle = card.getByRole('button', { name: 'Expand papertek bio' });

    await toggle.click();
    await expect(card.getByRole('button', { name: 'Collapse papertek bio' })).toHaveAttribute('aria-expanded', 'true');
    await expect(card).toContainText('designs, business, websites');
    await card.getByRole('button', { name: 'Collapse papertek bio' }).click();
    await expect(card.getByRole('button', { name: 'Expand papertek bio' })).toHaveAttribute('aria-expanded', 'false');
});

test('service links prefill the contact form', async ({ page }) => {
    await page.goto('/services');
    await page.locator('a[href="/contact?service=landing-page-creation"]').click();

    await expect(page).toHaveURL(/\/contact\?service=landing-page-creation$/);
    await expect(page.getByLabel('Reason for contact')).toHaveValue('landing-page-creation');
    await expect(page.getByLabel('Message')).toHaveValue(/learn more about landing page creation/);
});

for (const path of ['/', '/services', '/apply', '/contact', '/about']) {
    test(`${path} has no horizontal overflow on a phone viewport`, async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto(path);

        const width = await page.evaluate(() => document.documentElement.scrollWidth);
        expect(width).toBeLessThanOrEqual(390);
    });
}
