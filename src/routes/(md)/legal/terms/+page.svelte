<script lang="ts">
    import LegalPage from '$lib/components/Legal.svelte';
    let { data } = $props();
</script>

<LegalPage {data} />