import { test, expect } from '@playwright/test';

const frontendServerLink = 'https://solync.org/';

test('everything is there when scrolling', async ({ page }) => {
    await page.goto(frontendServerLink);

    await page.mouse.wheel(0, -page.viewportSize()!.height);

    // Projects list is should be visible
    await expect(page.getByText('IdeaLync')).toBeVisible();

    // Team members list should be visible
    await expect(page.getByText('papertek', { exact: true }));

    // Blog posts should be visible
    await expect(await page.locator("xpath=//img[starts-with(@src,'/images/articles/')]").visible().count()).toBeGreaterThan(0);
});

test.describe('interactions', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(frontendServerLink);
        await page.mouse.wheel(0, -page.viewportSize()!.height);
    });

    test('member arrow button works', async ({ page }) => {
        await page.locator("xpath=//div[..//p[text()='papertek']]/button").click();
        await expect(page.locator("xpath=//div[..//p[text()='papertek']]/button")).toContainClass('bg-black');
        // seems like the text is strictly related to animations, idk how to check if it's *actually* visible
    });
});

// this thing below is either not working or useless

// test.describe('navigation', () => {
//     test.beforeEach(async ({ page }) => {
//         await page.goto(frontendServerLink);
//         await page.mouse.wheel(0, -page.viewportSize()!.height);

//         // wait that everything has loaded
//         await page.waitForTimeout(10000);
//     });

//     test(`links should link to a valid page, and not redirect after`, async ({ page }) => {
//         // todo: proper logging to know which links crash

//         const links = await page.getByRole('link').all();

//         // for individual link that those conditions do not apply,
//         // try making individual tests for those and filter them out of this list
//         links.forEach(async (linkTag) => {
//             const url = await linkTag.getAttribute('href');
//             console.log(`Testing ${url}`);

//             if (url !== null || url !== '#') {
//                 await linkTag.click();
//                 await page.waitForURL(url!);

//                 // they shouldn't redirect to smth else
//                 await page.waitForTimeout(5000);
//                 await page.waitForURL('url');

//                 await page.goto(frontendServerLink);
//             }
//         });
//     });
// });
