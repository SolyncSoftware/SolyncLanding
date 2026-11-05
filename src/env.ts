import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
    CONTACT_PAGE_HOOK: { schema: (input) => input ?? '' },
    APPLY_PAGE_HOOK: { schema: (input) => input ?? '' }
});
