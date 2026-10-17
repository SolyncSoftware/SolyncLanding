# SolyncLanding (SL)

## Getting Started

> [!IMPORTANT]
> Please make sure to install [Bun](https://bun.sh/). This project is optimized for Bun.
> Also install [Prettier](https://prettier.io/docs/editors).

To begin development and testing locally, please follow these steps in your terminal of choice:

1. Clone the repo by running `git clone https://github.com/SolyncSoftware/SolyncLanding.git`.
2. Go into the newly cloned folder (`cd SolyncLanding`).
3. Run `bun install` to install the packages.
4. Great! Now run `bun run dev` to run the development server.
5. Enter the URL it provides (by default, it is <http://localhost:3000>) in your browser.

## Tests

The browser tests run against the production build. Form submissions are intercepted in the browser, and schema checks run directly, so the suite does not send messages to Discord. Build the app once, then run the suite:

```sh
bun run build
bun run test
```

The suite covers page rendering, desktop and mobile navigation, form submissions and errors, API responses, and phone-width overflow on key pages. CI installs Chromium and runs the same suite for pushes and pull requests.

## Goals

- Minimize bloat
- Open source
- Internal initiative-driven tasks with a [Kanban Board](https://github.com/orgs/SolyncSoftware/projects/5/views/1).

## Resources

- [SvelteKit documentation](https://kit.svelte.dev/docs)
- [Bun Documentation](https://bun.sh/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Official Docs](https://tailwindcss.com/docs/)
- [Solync Community Discord](https://discord.com/invite/nUeRyRtDYC)
