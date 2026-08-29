<script lang="ts">
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import Button from '$lib/components/Button.svelte';
    import Form from '$lib/components/Form.svelte';
    import SubmittedMessage from '$lib/components/SubmittedMessage.svelte';
    import CircleX from '@lucide/svelte/icons/circle-x';

    let selectedFile = $state<File | null>(null);
    let fileError = $state<string | null>(null);
    let isSubmitting = $state(false);
    let response: null | { type: 'success' } | { type: 'error'; message: string } = $state(null);

    const MAX_FILE_SIZE = 10000000;
    const allowedExtensions = ['pdf', 'doc', 'docx'];

    function handleFileChange(event: Event) {
        console.log('Changing file...');
        const input = event.currentTarget as HTMLInputElement;

        const file = input.files?.[0] ?? null;
        if (!file) {
            return;
        }

        fileError = null;

        const extension = file.name.toLowerCase().split('.').pop();

        if (!extension || !allowedExtensions.includes(extension)) {
            fileError = 'Please choose a .pdf, .doc, or .docx file.';
            input.value = '';
            return;
        }

        if (file.size > MAX_FILE_SIZE) {
            fileError = 'Selected file is too large.';
            input.value = '';
            return;
        }

        console.log(`Changed input to ${file.name} (${file.size}B)`);
        selectedFile = file;
    }

    async function handleSubmit(formData: Record<string, string>) {
        const file = selectedFile;

        if (!file) {
            fileError = 'Please attach a file!';
            throw new Error('Please attach a file.');
        }

        // put the frontend's formData into a payload.
        const payload = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            payload.append(key, value);
        }

        // include the file in the payload.
        payload.append('resume', file, file.name);

        const res = await fetch('/api/apply', {
            method: 'POST',
            body: payload
        });
        const result = await res.json();

        if (!res.ok) {
            throw new Error(result.error || 'Error submitting form.');
        }
    }
</script>

<section class="flex flex-col gap-14">
    <PageContainer className="bg-emerald-600">
        <div class="flex flex-col justify-between xl:flex-row xl:pr-24">
            <div class="max-w-200 font-medium">
                <h1 class="max-w-190 text-4xl font-bold md:text-6xl">Applying to Solync.</h1>

                <p class="mt-4 text-2xl">
                    We aren't looking for specific skill sets or backgrounds. Instead, we look for curious collaborators. We seek
                    <a
                        href="https://en.wikipedia.org/wiki/T-shaped_person"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline hover:text-black"
                        >T-Shaped
                    </a> individuals who bring expertise in their craft while having broad curiosity across other disciplines.
                </p>

                <p class="mt-4 text-2xl">
                    As a <a
                        href="https://en.wikipedia.org/wiki/Flat_organization"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="underline hover:text-black">flat collective</a
                    >, we operate without any formal hierarchy or micromanagement. Joining Solync means taking direct ownership of what we
                    build, choosing projects that align with your interests and the collective's goals, and collaborating with peers who
                    challenge ideas without ego.
                </p>
            </div>
        </div>
    </PageContainer>

    <div class="grid grid-cols-1 gap-4 text-lg md:grid-cols-2 lg:grid-cols-2">
        <div class="rounded-4xl bg-white p-9 shadow-xl/4">
            <h2 class="mb-4 text-3xl font-bold">What we offer (so far)</h2>

            <ul class="ml-6 list-disc">
                <li class="mb-4">An organization where the environment and schedule is extremely flexible.</li>
                <li class="mb-4">
                    Opportunity to collaborate with experienced members to gain insight, inspiration, and expansive skillsets.
                </li>

                <li class="mb-4">
                    Freedom to explore your own ideas and projects, and the opportunity to pitch them to the collective for feedback and
                    support.
                </li>
            </ul>
        </div>

        <div class="rounded-4xl bg-white p-9 shadow-xl/4">
            <h2 class="mb-4 text-3xl font-bold">What we're looking for</h2>

            <ul class="ml-6 list-disc">
                <li class="mb-4">Curiosity and a willingness to learn and adapt.</li>
                <li class="mb-4">Collaboration and working with others.</li>
                <li class="mb-4">Self-direction, like managing your own work and taking initiative.</li>
                <li class="mb-4">A belief in ethical user-first experiences.</li>
            </ul>
        </div>
    </div>

    <div class="flex flex-col gap-4 rounded-4xl bg-white p-9 shadow-xl/4">
        {#if !response || response.type !== 'success'}
            <h2 class="mb-4 text-3xl font-bold">Apply now!</h2>

            <div class="mb-6 flex flex-col justify-between gap-4 text-lg xl:flex-row">
                <Form
                    id="apply-form"
                    bind:loading={isSubmitting}
                    bind:response
                    fields={[
                        { name: 'name', label: 'Name', placeholder: 'Your name', type: 'text', required: true, span: 2 },
                        { name: 'email', label: 'Email', placeholder: 'Your email', type: 'email', required: true, span: 2 },
                        {
                            name: 'reason',
                            type: 'select',
                            label: 'How did you discover Solync?',
                            required: true,
                            options: [
                                { value: 'social-media', label: 'Social Media' },
                                { value: 'partners', label: 'Partners' },
                                { value: 'referral', label: 'Referral' },
                                { value: 'word-of-mouth', label: 'Word of mouth' },
                                { value: 'other', label: 'Other' }
                            ],
                            span: 2
                        },
                        // {
                        //     name: 'message_one',
                        //     label: 'What projects have you worked on? ',
                        //     placeholder: 'ex. I need a...',
                        //     type: 'textarea',
                        //     rows: 1,
                        //     required: true,
                        //     span: 2,
                        //     class: 'rounded-4xl!'
                        // },
                        {
                            name: 'message',
                            label: 'Portfolio',
                            placeholder: 'Link to your portfolio',
                            type: 'url',
                            rows: 1,
                            required: true,
                            span: 2
                        }
                    ]}
                    onsubmit={handleSubmit}
                />
                <div class="flex w-full flex-col gap-2">
                    <label for="fileInput">
                        Attach your resume (.doc, .docx, .pdf). Must be less than 10MB.<span class="text-accent">*</span>
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        name="resume"
                        form="apply-form"
                        required
                        accept=".doc,.docx,.pdf"
                        class="file:bg-accent file:rounded-full file:px-4 file:py-2 file:text-white"
                        onchange={handleFileChange}
                    />
                    {#if fileError}
                        <p class="text-error">{fileError}</p>
                    {/if}
                </div>
            </div>

            <div class="flex w-full min-w-0 flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
                {#if response && response.type == 'error'}
                    <div class="flex min-w-0 flex-row items-center gap-2">
                        <CircleX class="text-error shrink-0" />
                        <p class="text-error max-w-[12em] leading-[1em]">{response?.message}</p>
                    </div>
                {/if}
                <Button
                    form="apply-form"
                    type="submit"
                    class="text-lg!"
                    text={isSubmitting ? 'Submitting...' : 'Send application'}
                    disabled={isSubmitting ? true : undefined}
                ></Button>
            </div>
        {:else}
            <SubmittedMessage />
        {/if}
        <div></div>
    </div>
</section>
