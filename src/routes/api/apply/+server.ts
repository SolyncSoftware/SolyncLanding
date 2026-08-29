import { json } from '@sveltejs/kit';
import { APPLY_PAGE_HOOK } from '$env/static/private';
import type { RequestHandler } from './$types.js';
import processError from '$lib/server/utilities/request/error.js';
import applySchema from '$lib/server/schema/apply.js';

export const POST: RequestHandler = async ({ request }) => {
    try {
        const rawData = await request.formData();

        const candidate = {
            name: rawData.get('name'),
            email: rawData.get('email'),
            reason: rawData.get('reason'),
            message: rawData.get('message'),
            resume: rawData.get('resume')
        }
        const validationResult = applySchema.safeParse(candidate);

        if (!validationResult.success) {
            throw new Error("Invalid input fields", { cause: { statusCode: 400 } });
        }
        const data = validationResult.data;
        console.log(data);
        const resume = data.resume;

        const discordPayload = {
            allowed_mentions: {parse: []},
            embeds: [
                {
                    title: 'Apply Form Submission',
                    color: 0xf36647,
                    fields: [
                        { name: 'Name', value: data.name, inline: true },
                        { name: 'Email', value: data.email, inline: true },
                        { name: 'Discovery', value: data.reason, inline: false },
                        { name: 'Portfolio', value: data.message }
                    ],
                    timestamp: new Date().toISOString()
                }
            ]
        };

        const discordForm = new FormData();
        discordForm.append('payload_json', JSON.stringify(discordPayload));
        discordForm.append('files[0]', resume, `Resume ${data.name} ${new Date().toLocaleDateString("en-CA")}.${resume.name.split('.').pop()}`)

        const discordResponse = await fetch(APPLY_PAGE_HOOK, {
            method: 'POST',
            body: discordForm
        })

        if (!discordResponse.ok) {
            throw new Error("Failed to send application to Discord.", { cause: { statusCode: 502 } });
        }

        return json({ success: true });
    } catch (err) {
        return processError(err);
    }
};
