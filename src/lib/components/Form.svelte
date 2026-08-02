<script lang="ts">
    import Textbox from './Textbox.svelte';
    import Button from './Button.svelte';

    interface Field {
        name: string;
        type: 'text' | 'textarea' | 'select';
        label?: string;
        placeholder?: string;
        rows?: number; // for textarea, ignored otherwise
        options?: { value: string; label: string }[];
        span?: number; // how many columns the field should span (default 1)
        required?: boolean;
    }

    interface ButtonProps {
        text: string;
        onClick?: (formData: Record<string, string>) => void;
    }

    let {
        fields,
        columns = 1,
        values = {},
        button
    }: {
        fields: Field[];
        columns?: number;
        values?: Record<string, string>;
        button?: ButtonProps;
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
    let loading = $state(false);

    function requiredFieldsMissing(): boolean {
        for (const f of fields) {
            if (f.required && !formData[f.name]?.trim()) {
                return true;
            }
        }
        return false;
    }

    function handleSubmit() {
        if (loading) {
            return;
        }
        loading = true;
        console.log('loading?:', loading);

        if (requiredFieldsMissing()) {
            alert('Please fill in all required fields.');
            loading = false;
            return;
        }

        try {
            button?.onClick?.(formData);
            console.log('loading?:', loading);
        } finally {
            loading = false;
            alert('Message sent! We will get back to you as soon as possible.');
        }
    }
</script>

<div class="w-full font-sans text-2xl">
    <div class="grid gap-4" style="grid-template-columns: repeat({columns}">
        {#each fields as field}
            {#if field.type === 'select'}
                <div class="flex flex-col gap-1 text-lg" style="grid-column: span {field.span ?? 0};">
                    {#if field.label}
                        <span>{field.label}</span>
                    {/if}
                    <select
                        bind:value={formData[field.name]}
                        required={field.required}
                        class="focus:ring-accent bg-offwhite rounded-full border border-none px-5 py-4 text-black placeholder:text-white/50"
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
                <Textbox
                    bind:value={formData[field.name]}
                    rows={field.type === 'textarea' ? (field.rows ?? 4) : 1}
                    placeholder={field.placeholder}
                    style="grid-column: span {field.span ?? 1};"
                />
            {/if}
        {/each}
    </div>

    {#if button}
        <div class="mt-4 w-fit justify-self-end">
            <Button onclick={handleSubmit} {loading} text={button.text} />
        </div>
    {/if}
</div>
