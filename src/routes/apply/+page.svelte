<script lang="ts">
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import Button from '$lib/components/Button.svelte';
    import Form from '$lib/components/Form.svelte';

    async function handleSubmit(formData: Record<string, string>) {
        const res = await fetch('/api/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.error || 'error submitting form');
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

    <div class="rounded-4xl bg-white p-9 shadow-xl/4">
        <h2 class="mb-4 text-3xl font-bold">Apply now!</h2>

        <div class="mb-6 flex flex-col justify-between gap-4 text-lg xl:flex-row">
            <Form
                id="apply-form"
                fields={[
                    { name: 'name', placeholder: 'Your name', type: 'text', required: true, span: 2 },
                    { name: 'email', placeholder: 'Your email', type: 'text', required: true, span: 2 },
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
                    { name: 'message', placeholder: 'Your portfolio site', type: 'textarea', rows: 1, required: false, span: 2 }
                ]}
                onsubmit={handleSubmit}
            />
            <div class="flex w-full flex-col gap-6">
                <p class="max-w-90">Attach your documents. Please include a resume (.doc, .docx, .pdf).</p>
                <div
                    class="border-accent/80 bg-offwhite flex flex-1 cursor-pointer flex-col items-center justify-center rounded-4xl border-2 border-dashed py-10"
                >
                    <span class="text-accent font-bold">Choose files</span>
                    <span class="text-black/48">or drop them here</span>
                </div>
                <span><span class="text-accent font-bold underline underline-offset-5">Choose files</span>. No files chosen</span>
            </div>
        </div>

        <div class="flex justify-end">
            <Button form="apply-form" type="submit" text="Send application" class="text-lg!"></Button>
        </div>
    </div>
</section>
