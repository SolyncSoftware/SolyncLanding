<script lang="ts">
    import Legal from '$lib/components/Legal.svelte';
    let { data } = $props();
</script>

<Legal revised={data.revised} html={data.html} />
