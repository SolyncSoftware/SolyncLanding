<!--
    Displays articles based on their slug.
    Example: articles/legal/privacy.md is available at :///legal/privacy
-->

<script lang="ts">
    let { data } = $props();
    let Content = $derived(data.content);
</script>

<Content />
