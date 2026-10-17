import { defineConfig, devices } from '@playwright/test';

const host = 'http://127.0.0.1:4173';
const browser = { ...process.env };

delete browser.XDG_RUNTIME_DIR;
delete browser.DBUS_SESSION_BUS_ADDRESS;

export default defineConfig({
    testDir: './tests/e2e',
    fullyParallel: true,
    forbidOnly: Boolean(process.env.CI),
    retries: process.env.CI ? 1 : 0,
    workers: 2,
    reporter: process.env.CI ? 'line' : 'list',
    use: {
        baseURL: host,
        trace: 'retain-on-failure',
        screenshot: 'only-on-failure',
        launchOptions: { env: browser },
        ...devices['Desktop Chrome']
    },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    webServer: {
        command: 'bun run build/index.js',
        url: host,
        reuseExistingServer: false,
        timeout: 120000,
        env: {
            HOST: '127.0.0.1',
            ORIGIN: host,
            PORT: '4173'
        }
    }
});
