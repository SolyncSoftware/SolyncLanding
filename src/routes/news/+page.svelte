<script lang="ts">
    import LargePost from '$lib/components/news/LargePost.svelte';
    import SmallPost from '$lib/components/news/SmallPost.svelte';
</script>

<h1 class="text-5xl font-bold">LATEST NEWS</h1>
<div class="mt-6 flex max-w-301 flex-col gap-12">
    <LargePost />

    <div class="flex flex-row gap-8">
        <SmallPost />
        <SmallPost />
    </div>
</div>
