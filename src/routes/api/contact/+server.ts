import { json } from '@sveltejs/kit';
import { CONTACT_PAGE_HOOK } from '$env/static/private';
import type { RequestHandler } from './$types.js';
import { error } from '@sveltejs/kit';
import contactSchema from '$lib/schema/contact.js';

export const POST: RequestHandler = async ({ request }) => {
    try {
        // ===== validation. perhaps can be reused within a middleware or something idk

        // check if input has the expected Content-Type
        const contentType = request.headers.get('Content-Type');
        if (contentType?.includes("application/json")) {
            throw new Error("Invalid input type", { cause: { statusCode: 415 } });
        }

        const rawData = await request.json(); // json() should throw an error when it can't be parsed
        console.log(rawData);

        // ensuring data is an object
        if (!(typeof rawData === 'object' && rawData !== null && !Array.isArray(rawData))) {
            throw new Error("Invalid input type", { cause: { statusCode: 415 } });
        }

        // trim trailing whitespace for every string field
        const data = Object.fromEntries(
            Object.entries(rawData).map(([key, value]) => [
                key,
                typeof value === 'string' ? value.trim() : value
            ]
        ));

        // zod validation
        const validationResult = contactSchema.safeParse(data);
        if (!validationResult.success) {
            throw new Error("Invalid input fields", { cause: { statusCode: 400 } });
        }


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
            return json({ error: 'Failed to send to Discord' }, { status: 502 });
        }

        return json({ success: true });
    } catch (err) {
        console.error('Server error:', err);
        return json({ error: 'Internal server error' }, { status: 500 });
    }
};
