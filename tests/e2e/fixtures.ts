import { test as base, expect } from '@playwright/test';

const unicorn = `
    window.UnicornStudio = window.UnicornStudioNext = {
        init: async () => [],
        addScene: async () => ({ paused: false, destroy() {}, setVariables() {} }),
        destroy() {}
    };
`;

export const test = base.extend({
    page: async ({ page }, use) => {
        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'hardwareConcurrency', { value: 2 });
        });
        await page.route('**/vendor/unicornStudio.umd.js', (route) =>
            route.fulfill({ contentType: 'application/javascript', body: unicorn })
        );
        await page.route('https://avatars.githubusercontent.com/**', (route) => route.abort());
        await page.route('https://ko-fi.com/**', (route) => route.abort());
        await use(page);
    }
});

export { expect };
