<script lang="ts">
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import Button from '$lib/components/Button.svelte';
    import Form from '$lib/components/Form.svelte';
    import CircleX from '@lucide/svelte/icons/circle-x';
    import CircleCheckBig from '@lucide/svelte/icons/circle-check-big';

    let isSubmitting = $state(false);
    let response: null | {type: "success"} | {type: "error", message: string} = $state(null);

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
    <PageContainer className="bg-indigo-500">
        <div class="flex flex-col justify-between xl:flex-row xl:pr-24">
            <div class="max-w-200 font-medium">
                <h1 class="max-w-190 text-4xl font-bold md:text-6xl">Contacting Solync.</h1>

                <p class="mt-4 text-2xl">All of our messages are sent to us via Discord webhooks for centralized communication.</p>

                <p class="mt-4 text-2xl">
                    If you need customer service regarding any of our projects, please reach out to us on Discord and message @ModMail.
                </p>
            </div>
        </div>
    </PageContainer>

    <div class="rounded-4xl bg-white p-9 shadow-xl/4">
        <h2 class="mb-4 text-3xl font-bold">Contact us</h2>
        <div class="mb-6 flex flex-col justify-between gap-12 text-lg xl:flex-row">
            <div class="flex w-full flex-col gap-6">
                <div class="flex items-center gap-4">
                    <img src="/images/placeholders/@placeholder.svg" alt="Email" class="h-11 w-11 object-cover" loading="lazy" />
                    <div class="font-display flex flex-col">
                        <span class="text-accent text-2xl">Email John</span>
                        <a href="mailto:john@solync.org" class="hover:text-accent text-xl hover:underline">john@solync.org</a>
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    <img src="/images/placeholders/@placeholder.svg" alt="Discord" class="h-11 w-11 object-cover" loading="lazy" />
                    <div class="font-display flex flex-col">
                        <span class="text-accent text-2xl">Discord</span>
                        <a
                            href="https://discord.gg/nUeRyRtDYC"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="hover:text-accent text-xl hover:underline"
                        >
                            Click to join our Discord
                        </a>
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    <img src="/images/placeholders/@placeholder.svg" alt="GitHub" class="h-11 w-11 object-cover" loading="lazy" />
                    <div class="font-display flex flex-col">
                        <span class="text-accent text-2xl">GitHub</span>
                        <a
                            href="https://github.com/SolyncSoftware"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="hover:text-accent text-xl hover:underline"
                        >
                            Click to visit our GitHub
                        </a>
                    </div>
                </div>
            </div>

            {#if !response || response.type !== "success"}
            <div class="flex w-full flex-col gap-6">
                <Form
                    id="contact-form"
                    bind:loading={isSubmitting}
                    bind:response={response}
                    fields={[
                        { name: 'name', placeholder: 'Your name', type: 'text', required: true, span: 1 },
                        { name: 'email', placeholder: 'Your email', type: 'email', required: true, span: 1 },
                        {
                            name: 'reason',
                            type: 'select',
                            label: 'Reason for contact',
                            required: true,
                            options: [
                                { value: 'support', label: 'Support' },
                                { value: 'question', label: 'Questions' },
                                { value: 'partners', label: 'Partners' },
                                { value: 'trust-and-safety', label: 'Trust and Safety' },
                                { value: 'other', label: 'Other' }
                            ],
                            span: 2
                        },
                        {
                            name: 'message',
                            placeholder: 'Message content',
                            type: 'textarea',
                            rows: 3,
                            required: true,
                            span: 2,
                            class: 'rounded-4xl!'
                        }
                    ]}
                    onsubmit={handleSubmit}
                />
                <div class="w-full min-w-0 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-end">
                    {#if response && response.type == "error"}
                    <div class="min-w-0 flex flex-row gap-2 items-center">
                        <CircleX class="text-error shrink-0"/>
                        <p class="leading-[1em] text-error max-w-[12em]">{response?.message}</p>
                    </div>
                    {/if}
                    <Button form="contact-form" type="submit" class="self-end! h-fit! text-lg! shrink-0"
                        text={isSubmitting ? "Submitting..." : "Send message"}
                        disabled={isSubmitting ? true : undefined}
                    ></Button>
                </div>
            </div>
            {:else}
            <div class="flex w-full flex-col justify-center items-center gap-2">
                <CircleCheckBig size={72} class="text-accent"/>
                <div class="flex flex-col items-center gap-1">
                    <h2 class="text-3xl font-display text-accent">Message sent!</h2>
                    <p>We will get back to you as soon as possible.</p>
                </div>
            </div>
            {/if}
        </div>
    </div>
</section>
