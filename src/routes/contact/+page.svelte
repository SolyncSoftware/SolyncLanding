<script lang="ts">
    import { page } from '$app/state';
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import Button from '$lib/components/Button.svelte';
    import Form from '$lib/components/Form.svelte';
    import CircleX from '@lucide/svelte/icons/circle-x';
    import { SiDiscord, SiGithub } from '@icons-pack/svelte-simple-icons';
    import SubmittedMessage from '$lib/components/SubmittedMessage.svelte';
    import { stores as waveStores } from '$lib/stores/persistentWave.js';

    const serviceTitles: Record<string, string> = {
        'landing-page-creation': 'landing page creation',
        'brochure-website-creation': 'brochure website creation',
        'deployment-hosting': 'deployment and hosting',
        'static-hosting': 'static hosting'
    };
    const selectedReason = $derived(page.url.searchParams.get('service') ?? '');
    const selectedServiceTitle = $derived(serviceTitles[selectedReason] ?? '');
    const initialMessage = $derived(
        selectedServiceTitle ? `Hello Solync,\n\nI'd like to learn more about ${selectedServiceTitle}.\n\nMy project details:\n` : ''
    );

    let isSubmitting = $state(false);
    let response: null | { type: 'success' } | { type: 'error'; message: string } = $state(null);

    async function handleSubmit(formData: Record<string, string>) {
        const res = await fetch('/api/contact', {
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
    <PageContainer className="bg-indigo-500" waveStore={waveStores.dottyLogo}>
        <div class="flex flex-col justify-between xl:flex-row xl:pr-24">
            <div class="max-w-200 space-y-4 font-medium">
                <h1 class="max-w-190 text-4xl font-black md:text-6xl">Contacting Solync.</h1>

                <p class="text-2xl">All of our messages are sent to us via Discord webhooks for centralized communication.</p>

                <p class="text-2xl">
                    Got ideas, questions, or something else to share? Tell us about it below, and we'll take it from there.
                </p>

                <p class="text-2xl">
                    If you need to see our services, please visit our <a href="/services" class="underline hover:text-black">services</a> page.
                </p>
            </div>
        </div>
    </PageContainer>

    <div class="grid gap-10 rounded-4xl bg-white p-6 shadow-xl/4 sm:p-9 lg:grid-cols-2 lg:gap-14">
        <div class="min-w-0">
            <h2 class="text-4xl font-black">Contact us</h2>

            {#if !response || response.type !== 'success'}
                <div class="mt-5 flex w-full flex-col gap-6">
                    <Form
                        id="contact-form"
                        bind:loading={isSubmitting}
                        bind:response
                        fields={[
                            { name: 'name', label: 'Name', placeholder: 'ex. Cappucino Assassino', type: 'text', required: true, span: 1 },
                            { name: 'email', label: 'Email', placeholder: 'ex. alice@aol.com', type: 'email', required: true, span: 1 },
                            {
                                name: 'reason',
                                type: 'select',
                                label: 'Reason for contact',
                                required: true,
                                options: [
                                    { value: 'support', label: 'Support' },
                                    { value: 'question', label: 'Questions' },
                                    { value: 'landing-page-creation', label: 'Landing page creation' },
                                    { value: 'brochure-website-creation', label: 'Brochure website creation' },
                                    { value: 'deployment-hosting', label: 'Deployment & hosting' },
                                    { value: 'static-hosting', label: 'Static hosting' },
                                    { value: 'website-creation', label: 'Website Creation' },
                                    { value: 'hosting', label: 'Basic Hosting' },
                                    { value: 'partners', label: 'Partners' },
                                    { value: 'trust-and-safety', label: 'Trust and Safety' },
                                    { value: 'other', label: 'Other' }
                                ],
                                span: 2
                            },
                            {
                                name: 'message',
                                label: 'Message',
                                placeholder: 'ex. I need a...',
                                type: 'textarea',
                                rows: 3,
                                required: true,
                                span: 2,
                                class: 'rounded-4xl!'
                            }
                        ]}
                        values={{ reason: selectedServiceTitle ? selectedReason : '', message: initialMessage }}
                        onsubmit={handleSubmit}
                    />
                    <div class="flex w-full min-w-0 flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                        {#if response && response.type == 'error'}
                            <div class="flex min-w-0 flex-row items-center gap-2">
                                <CircleX class="text-error shrink-0" />
                                <p class="text-error leading-[1.2]">{response?.message}</p>
                            </div>
                        {/if}
                        <Button
                            form="contact-form"
                            type="submit"
                            class="h-fit! shrink-0 self-end! text-lg! sm:self-auto!"
                            text={isSubmitting ? 'Submitting...' : 'Send message'}
                            disabled={isSubmitting ? true : undefined}
                        ></Button>
                    </div>
                </div>
            {:else}
                <SubmittedMessage />
            {/if}
        </div>

        <aside class="flex min-w-0 flex-col border-t-2 border-black/10 pt-8 lg:border-t-0 lg:border-l-2 lg:pt-0 lg:pl-12">
            <h2 class="text-4xl font-black">Customer Service</h2>
            <p class="mt-5 max-w-120 text-xl leading-relaxed">
                If you need customer service regarding any of our projects, please reach out to us on Discord and message @ModMail.
            </p>

            <a
                href="https://discord.gg/nUeRyRtDYC"
                target="_blank"
                rel="noopener noreferrer"
                class="text-accent border-accent hover:bg-accent mt-8 flex min-h-18 w-full max-w-120 items-center justify-center gap-4 rounded-full border-2 px-6 py-4 text-lg font-bold tracking-wide transition-colors hover:text-white sm:text-xl"
            >
                <span>Join our Discord</span>
                <SiDiscord class="h-7 w-7 shrink-0" aria-hidden="true" />
            </a>

            <div class="mt-10 border-t border-black/10 pt-6">
                <p class="text-lg leading-relaxed">
                    For other inquries Email us at <a
                        href="mailto:hello@solync.org"
                        class="hover:text-accent font-bold underline decoration-2 underline-offset-4">hello@solync.org</a
                    >.
                </p>

                <a
                    href="https://github.com/SolyncSoftware"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-accent border-accent hover:bg-accent mt-8 flex min-h-18 w-full max-w-120 items-center justify-center gap-4 rounded-full border-2 px-6 py-4 text-lg font-bold tracking-wide transition-colors hover:text-white sm:text-xl"
                >
                    <span>Visit our GitHub</span>
                    <SiGithub class="h-7 w-7 shrink-0" aria-hidden="true" />
                </a>
            </div>
        </aside>
    </div>
</section>
