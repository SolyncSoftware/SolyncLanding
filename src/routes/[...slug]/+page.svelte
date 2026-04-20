<script lang="ts">
    let { data } = $props();
    let Content = $derived(data.content);
</script>

<Content />
