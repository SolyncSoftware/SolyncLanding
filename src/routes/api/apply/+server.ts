import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types.js';
import processError from '$lib/server/utilities/request/error.js';
import applySchema from '$lib/server/schema/apply.js';

export const POST: RequestHandler = async ({ request }) => {
    const APPLY_PAGE_HOOK = env.APPLY_PAGE_HOOK;

    if (!APPLY_PAGE_HOOK) {
        console.error('APPLY_PAGE_HOOK is missing or empty');
        return json({ error: 'Server misconfigured' }, { status: 500 });
    }

    try {
        const rawData = await request.formData();

        // this needs to be dynamic -john
        const candidate = {
            name: rawData.get('name'),
            email: rawData.get('email'),
            reason: rawData.get('reason'),
            message: rawData.get('message'),
            worked_on: rawData.get('message_one'),
            doing_now: rawData.get('message_two'),
            skills: rawData.get('message_three'),
            why_solync: rawData.get('message_four')
            // resume: rawData.get('resume')
        };
        const validationResult = applySchema.safeParse(candidate);

        if (!validationResult.success) {
            throw new Error('Invalid input fields', { cause: { statusCode: 400 } });
        }
        const data = validationResult.data;
        console.log(data);
        // const resume = data.resume;

        const discordPayload = {
            allowed_mentions: { parse: [] },
            embeds: [
                {
                    title: 'Apply Form Submission',
                    color: 0xf36647,
                    fields: [
                        { name: 'Name', value: data.name, inline: true },
                        { name: 'Email', value: data.email, inline: true },
                        { name: 'Discovery', value: data.reason, inline: false },
                        { name: 'Working on', value: data.worked_on },
                        { name: 'Doing Now', value: data.doing_now },
                        { name: 'Skills', value: data.skills },
                        { name: 'Why Solync', value: data.why_solync },
                        { name: 'Portfolio', value: data.message }
                    ],
                    timestamp: new Date().toISOString()
                }
            ]
        };

        const discordForm = new FormData();
        discordForm.append('payload_json', JSON.stringify(discordPayload));
        // discordForm.append(
        //     'files[0]',
        //     resume,
        //     `Resume ${data.name} ${new Date().toLocaleDateString('en-CA')}.${resume.name.split('.').pop()}`
        // );

        const discordResponse = await fetch(APPLY_PAGE_HOOK, {
            method: 'POST',
            body: discordForm
        });

        if (!discordResponse.ok) {
            throw new Error('Failed to send application to Discord.', { cause: { statusCode: 502 } });
        }

        return json({ success: true });
    } catch (err) {
        return processError(err);
    }
};
