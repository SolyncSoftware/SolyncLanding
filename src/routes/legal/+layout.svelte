<script lang="ts">
    import { page } from '$app/state';
    let { children } = $props();
    const title = $derived(page.data.title);
</script>

<h1 class="text-5xl font-bold">{title}</h1>
<div class="border-t-accent mt-6 h-auto w-301 border-t-11 bg-black p-8">
    <span class="font-sans text-2xl">
        {@render children()}
    </span>
</div>
