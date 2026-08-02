import { json } from '@sveltejs/kit';
import { CONTACT_PAGE_HOOK } from '$env/static/private';
import type { RequestHandler } from './$types.js';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const data = await request.json();

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
