<script lang="ts">
    let input = $state('world');

    let { class: className = '', type = 'text', placeholder = 'Text...', value = $bindable(""), required = false, ...rest} = $props();

    function grow(node: HTMLTextAreaElement) {
        function adjust() {
            node.style.height = 'auto';
            node.style.height = node.scrollHeight + 'px';
        }
        node.addEventListener('input', adjust);
        adjust(); // initial
        return {
            destroy() {
                node.removeEventListener('input', adjust);
            }
        };
    }
</script>

{#if type === 'textarea'}
<textarea
    // use:grow // jank and stupid
    bind:value
    {...rest}
    class={`w-full min-w-0 focus:ring-accent bg-offwhite resize-none overflow-clip rounded-full
    px-5 py-4 font-sans text-lg focus:ring-2 focus:outline-none
    ${className}`}
    id="fname"
    name="fname"
    required={required}
    {placeholder}
></textarea>
{:else}
<input
    // use:grow // jank and stupid
    bind:value
    {...rest}
    type={type}
    class={`w-full min-w-0 inline-block focus:ring-accent bg-offwhite resize-none overflow-clip rounded-full
    px-5 py-4 font-sans text-lg focus:ring-2 focus:outline-none
    ${className}`}
    id="fname"
    name="fname"
    required={required}
    {placeholder}
/>
{/if}
