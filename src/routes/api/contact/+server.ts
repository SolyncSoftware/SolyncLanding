import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types.js';
import contactSchema from '$lib/server/schema/contact.js';
import validateRequest from '$lib/server/utilities/request/validate.js';
import processError from '$lib/server/utilities/request/error.js';

export const POST: RequestHandler = async ({ request }) => {
    const CONTACT_PAGE_HOOK = env.CONTACT_PAGE_HOOK ?? 'No_value';

    try {
        // ===== validation. perhaps can be reused within a middleware or something idk
        const data = await validateRequest(request, contactSchema);

        const discordPayload = {
            embeds: [
                {
                    title: 'Contact Form Submission',
                    color: 0xf36647,
                    fields: [
                        { name: 'Name', value: data.name, inline: true },
                        { name: 'Email', value: data.email, inline: true },
                        { name: 'Reason', value: data.reason, inline: false },
                        { name: 'Message', value: data.message }
                    ],
                    timestamp: new Date().toISOString()
                }
            ]
        };

        const res = await fetch(CONTACT_PAGE_HOOK, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Discord webhook error:', res.status, errorText);
            throw new Error('Failed to send to Discord', { cause: { statusCode: 502 } });
        }

        return json({ success: true });
    } catch (err: any) {
        return processError(err);
    }
};
