<script lang="ts">
    import Button from '$lib/components/Button.svelte';
    import Form from '$lib/components/Form.svelte';

    async function handleSubmit(formData: Record<string, string>) {
        const res = await fetch('/api/apply', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        console.log('formData:', formData);
        const result = await res.json();
        if (!res.ok) {
            throw new Error(result.error || 'error submitting form');
        }
    }
</script>

<h1 class="text-5xl font-bold">WORK AT NETRO</h1>

<div class="border-t-accent mt-6 h-auto w-301 border-t-11 bg-black/50 p-8 font-sans">
    <div class="mb-6 flex flex-row justify-between gap-4 text-xl">
        <!-- <div class="flex w-full flex-col gap-6">
            <Textbox rows="1" placeholder="Your name" />
            <Textbox rows="1" placeholder="Your email" />

            <div class="flex w-full flex-col gap-2">
                <span>How did you discover Netro?</span>
                <select class="border-accent/50 focus:ring-accent border bg-black px-5 py-4 text-white placeholder:text-white/50">
                    <option value="" disabled selected>Please select one</option>
                    <option value="social-media">Social Media</option>
                    <option value="partners">Partners</option>
                    <option value="referral">Referral</option>
                    <option value="word-of-mouth">Word of mouth</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p>If you can't include a resume, please include a link to your portfolio site.</p>
                <Textbox rows="1" placeholder="Your portfolio site" />
            </div>
        </div> -->

        <Form
            fields={[
                { name: 'name', placeholder: 'Your name', type: 'text', required: true, span: 2 },
                { name: 'email', placeholder: 'Your email', type: 'text', required: true, span: 2 },
                {
                    name: 'reason',
                    type: 'select',
                    label: 'How did you discover Netro?',
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
                { name: 'message', placeholder: 'Your portfolio site', type: 'textarea', rows: 1, required: true, span: 2 }
            ]}
            button={{
                text: 'Send message',
                onClick: handleSubmit
            }}
        />

        <!-- todo: add file upload functionality -->
        <div class="flex w-full flex-col gap-6">
            <p class="max-w-90">Attach your documents. Please include a resume (.doc, .docx, .pdf).</p>
            <div class="border-accent/80 flex flex-1 cursor-pointer flex-col items-center justify-center border-2 border-dashed bg-black">
                <span class="text-accent font-bold">Choose files</span>
                <span class="text-white/44">or drop them here</span>
            </div>
            <span><span class="text-accent font-bold underline underline-offset-5">Choose files</span>. No files chosen</span>
        </div>
    </div>

    <div class="flex justify-end">
        <Button on:click={handleSubmit} text="send application" />
    </div>
</div>
