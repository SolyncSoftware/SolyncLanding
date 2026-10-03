<script lang="ts">
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import Button from '$lib/components/Button.svelte';
    import Form from '$lib/components/Form.svelte';
    import SubmittedMessage from '$lib/components/SubmittedMessage.svelte';
    import { stores as waveStores } from '$lib/stores/persistentWave.js';
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

        fileError = null;

        // put the frontend's formData into a payload.
        const payload = new FormData();
        for (const [key, value] of Object.entries(formData)) {
            payload.append(key, value);
        }

        // include the file in the payload when provided.
        if (file) {
            payload.append('resume', file, file.name);
        }

        const res = await fetch('/api/apply', {
            method: 'POST',
            body: payload
        });
        const result = await res.json();

        if (!res.ok) {
            const message = typeof result.error === 'string' ? result.error : 'Error submitting form.';
            throw new Error(message);
        }
    }
</script>

<section class="flex flex-col gap-14">
    <PageContainer className="bg-emerald-600" waveStore={waveStores.dottyLogo}>
        <div class="flex flex-col justify-between xl:flex-row xl:pr-24">
            <div class="max-w-200 font-medium">
                <h1 class="max-w-190 text-4xl font-black md:text-6xl">Applying to Solync.</h1>

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

    <div class="space-y-4">
        <div class="relative overflow-hidden rounded-4xl bg-white p-11 text-xl shadow-xl/4">
            <h2 class="text-accent mb-20 max-w-100 text-7xl leading-14 font-black">
                <span class="font-thin">What we</span> Offer <span class="text-2xl font-medium">(so far)</span>
            </h2>
            <ul class="ml-6 max-w-170 list-disc space-y-4">
                <li>An organization where the environment and schedule is extremely flexible.</li>
                <li>Opportunity to collaborate with experienced members to gain insight, inspiration, and expansive skillsets.</li>
                <li>Access to infrastructure for development.</li>
                <li>
                    Freedom to explore your own ideas and projects, and the opportunity to pitch them to the collective for feedback and
                    support.
                </li>
            </ul>

            <img src="images/wrench-vector.svg" alt="building tools" class="absolute top-1/2 right-0 -translate-y-1/2" />
        </div>

        <div class="relative overflow-hidden rounded-4xl bg-white p-11 text-xl shadow-xl/4">
            <h2 class="text-accent mb-20 max-w-100 text-7xl leading-14 font-black">
                <span class="font-thin">What we're</span> Looking For
            </h2>
            <ul class="ml-6 max-w-170 list-disc space-y-4">
                <li>Curiosity and a willingness to learn and adapt.</li>
                <li>Collaboration and working with others.</li>
                <li>Self-direction, like managing your own work and taking initiative.</li>
                <li>Experience building real-world applications without relying on GenAI.</li>
                <li>A belief in ethical user-first experiences.</li>
            </ul>

            <img src="images/wrench-vector.svg" alt="building tools" class="absolute top-1/2 right-0 -translate-y-1/2" />
        </div>
    </div>

    <div class="flex flex-col gap-4 rounded-4xl bg-white p-9 shadow-xl/4">
        {#if !response || response.type !== 'success'}
            <h2 class="mb-4 text-4xl font-black">Apply now!</h2>

            <div class="bg-offwhite border-l-warning space-y-4 rounded-2xl border-l-4 p-5 text-lg">
                <p class="text-black/90">
                    <strong>Note:</strong> This is currently a volunteer position. The goal is to grow and move towards creating products that
                    generate revenue. If this happens, financial compensation will be available. We are looking for talent that's collaborative
                    (because we're a flat organization), flexible with their skills, and invested in shaping the future of Solync.
                </p>

                <span class="font-medium text-black/80">
                    While there are no position titles, we have certain fields we're interested in:
                </span>

                <!-- We can honestly make this an api call -->
                <div class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-3">
                    <span class="flex flex-wrap items-center gap-2.5 rounded-xl bg-white px-5 py-2 text-base shadow-xl/4 sm:rounded-full">
                        <span class="font-bold">UI/UX</span>
                        <span class="text-black/40">|</span>
                        <span class="text-black/80">Figma / Affinity / Adobe</span>
                    </span>

                    <span class="flex flex-wrap items-center gap-2.5 rounded-xl bg-white px-5 py-2 text-base shadow-xl/4 sm:rounded-full">
                        <span class="font-bold">Frontend</span>
                        <span class="text-black/40">|</span>
                        <span class="text-black/80">HTML / JavaScript / TypeScript / Vue / Astro / SvelteKit / Tailwind CSS</span>
                    </span>

                    <span class="flex flex-wrap items-center gap-2.5 rounded-xl bg-white px-5 py-2 text-base shadow-xl/4 sm:rounded-full">
                        <span class="font-bold">Backend</span>
                        <span class="text-black/40">|</span>
                        <span class="text-black/80">KTor / Kotlin / SvelteKit / MariaDB</span>
                    </span>

                    <span class="flex flex-wrap items-center gap-2.5 rounded-xl bg-white px-5 py-2 text-base shadow-xl/4 sm:rounded-full">
                        <span class="font-bold">SysAdmin</span>
                        <span class="text-black/40">|</span>
                        <span class="text-black/80">Proxmox / Debian / Docker / Nix</span>
                    </span>

                    <span class="flex flex-wrap items-center gap-2.5 rounded-xl bg-white px-5 py-2 text-base shadow-xl/4 sm:rounded-full">
                        <span class="font-bold">Social / Marketing</span>
                        <span class="px-1.5 text-black/40">|</span>
                        <span class="text-black/80">TikTok / Bluesky / IG / Twitter / YouTube</span>
                    </span>

                    <span class="flex flex-wrap items-center gap-2.5 rounded-xl bg-white px-5 py-2 text-base shadow-xl/4 sm:rounded-full">
                        <span class="font-bold">Legal</span>
                        <span class="text-black/40">|</span>
                        <span class="text-black/80">Business Advisor / Lawyer</span>
                    </span>
                </div>

                <span class="text-base font-medium text-black/80">A Discord account for communications and a Github is required.</span>
            </div>

            <div class="mb-6 flex flex-col justify-between gap-4 text-lg">
                <Form
                    id="apply-form"
                    bind:loading={isSubmitting}
                    bind:response
                    fields={[
                        { name: 'name', label: 'Name', placeholder: 'Your name', type: 'text', required: true, span: 1 },
                        { name: 'email', label: 'Email', placeholder: 'Your email', type: 'email', required: true, span: 1 },
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
                        {
                            name: 'message_one',
                            label: 'What projects have you worked on? (Min char 100)',
                            placeholder: 'ex. Mobile apps, discord bots, websites... etc',
                            type: 'textarea',
                            rows: 1,
                            required: true,
                            span: 2,
                            class: 'rounded-4xl!'
                        },
                        {
                            name: 'message_two',
                            label: 'What are you doing now? (Min char 100)',
                            placeholder: "ex. I have a few unfinished projects and I'm a student... etc",
                            type: 'textarea',
                            rows: 1,
                            required: true,
                            span: 2,
                            class: 'rounded-4xl!'
                        },
                        {
                            name: 'message_three',
                            label: 'What are your skills? (Min char 100)',
                            placeholder: 'ex. Problem solving, software engineering... etc',
                            type: 'textarea',
                            rows: 1,
                            required: true,
                            span: 2,
                            class: 'rounded-4xl!'
                        },
                        {
                            name: 'message_four',
                            label: 'Why are you interested in Solync? (Min char 150)',
                            placeholder: 'ex. Solync is awesome...',
                            type: 'textarea',
                            rows: 2,
                            required: true,
                            span: 2,
                            class: 'rounded-4xl!'
                        },
                        {
                            name: 'message',
                            label: 'Portfolio / Website (optional if you attach a resume)',
                            placeholder: 'Link to your portfolio or website',
                            type: 'url',
                            rows: 1,
                            span: 2
                        }
                    ]}
                    onsubmit={handleSubmit}
                />
                <div class="flex w-full flex-col gap-2">
                    <label for="fileInput">
                        Attach your resume (.doc, .docx, .pdf). Must be less than 10MB. Leave blank if you already linked a portfolio or
                        website.
                    </label>
                    <input
                        type="file"
                        id="fileInput"
                        name="resume"
                        form="apply-form"
                        accept=".doc,.docx,.pdf"
                        class="file:bg-offaccent file:rounded-full file:px-8 file:py-3 file:text-white file:transition-all file:hover:cursor-pointer file:hover:bg-black"
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
