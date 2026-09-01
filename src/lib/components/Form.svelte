<script lang="ts">
    import Textbox from './Textbox.svelte';

    interface Field {
        name: string;
        type: 'text' | 'textarea' | 'select' | 'email' | 'url';
        label?: string;
        placeholder?: string;
        rows?: number; // for textarea, ignored otherwise
        options?: { value: string; label: string }[];
        span?: number; // how many columns the field should span (default 1)
        class?: string;
        required?: boolean;
    }

    let {
        fields,
        columns = 1,
        values = {},
        id = '',
        loading = $bindable(false),
        response = $bindable(null),
        onsubmit
    }: {
        fields: Field[];
        columns?: number;
        values?: Record<string, string>;
        id?: string;
        loading?: boolean;
        response?: null | { type: 'success' } | { type: 'error'; message: string };
        onsubmit?: (data: Record<string, string>) => Promise<void>;
    } = $props();

    // Build initial form data from fields, merging any provided values
    function buildInitial(): Record<string, string> {
        const data: Record<string, string> = {};
        for (const f of fields) {
            data[f.name] = values[f.name] ?? '';
        }
        return data;
    }

    let formData = $state(buildInitial());

    function requiredFieldsMissing(): boolean {
        for (const f of fields) {
            if (f.required && !formData[f.name]?.trim()) {
                return true;
            }
        }
        return false;
    }

    async function handleSubmit(e: SubmitEvent) {
        e.preventDefault();
        if (loading) {
            return;
        }
        loading = true;
        console.log('loading?:', loading);

        if (requiredFieldsMissing()) {
            loading = false;
            response = { type: 'error', message: 'Please fill in all the required fields.' };
            return;
        }

        try {
            console.log('loading?:', loading);
            const submit = await onsubmit?.(formData);

            loading = false; // sets loading to false after done await-ing
            console.log('loading?:', loading);
            response = { type: 'success' };
        } catch (error) {
            response = { type: 'error', message: `Something went wrong. ${error}` };
            console.log('[Form Submission]', error);
            loading = false;
        }
    }

    function charCount(field: Field): number {
        return formData[field.name]?.length ?? 0;
    }
</script>

<form {id} onsubmit={handleSubmit} class="w-full min-w-0 font-sans text-2xl">
    <div class="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2">
        {#each fields as field}
            {#if field.type === 'select'}
                <div class={`flex min-w-0 flex-col gap-1 text-lg ${field.span && field.span > 1 ? 'md:col-span-2' : ''}`}>
                    {#if field.label}
                        <label for={field.name}>{field.label}</label>
                    {/if}
                    <select
                        bind:value={formData[field.name]}
                        required={field.required}
                        class="peer focus:ring-accent bg-offwhite w-full min-w-0 rounded-full border border-none px-5 py-4 text-black placeholder:text-white/50"
                    >
                        <option value="" disabled selected>
                            {field.placeholder || 'Please select one'}
                        </option>
                        {#each field.options ?? [] as opt}
                            <option value={opt.value}>{opt.label}</option>
                        {/each}
                    </select>
                </div>
            {:else}
                <div class={`flex min-w-0 flex-col gap-1 text-lg ${field.span && field.span > 1 ? 'md:col-span-2' : ''}`}>
                    {#if field.label}
                        <label for={field.name} class="after:text-accent after:content-['*']">
                            {field.label}
                            <span class="text-sm">
                                {charCount(field) > 0 ? ` ${charCount(field)}` : ''}
                            </span>
                        </label>
                    {/if}
                    <Textbox
                        bind:value={formData[field.name]}
                        type={field.type}
                        rows={field.type === 'textarea' ? (field.rows ?? 4) : 1}
                        placeholder={field.placeholder}
                        class={`peer w-full min-w-0 ${field.class ?? ''} ${field.span && field.span > 1 ? 'md:col-span-2' : ''}`}
                        required={field.required}
                    />
                </div>
            {/if}
        {/each}
    </div>
</form>
