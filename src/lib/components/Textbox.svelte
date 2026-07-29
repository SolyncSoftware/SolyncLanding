<script lang="ts">
    let input = $state('world');

    let { class: className = '', placeholder = 'Text...', ...rest } = $props();

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

<textarea
    // use:grow // jank and stupid
    {...rest}
    class={`focus:ring-accent bg-offwhite resize-none overflow-clip rounded-full px-5 py-4 font-sans text-xl focus:ring-2 focus:outline-none ${className}`}
    id="fname"
    name="fname"
    {placeholder}
></textarea>
