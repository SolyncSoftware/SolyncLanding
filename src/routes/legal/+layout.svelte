<script lang="ts">
    let { children } = $props();
</script>

<div class="border-t-accent mt-6 h-auto w-301 border-t-11 bg-black p-8">
    <span class="font-sans text-2xl">
        {@render children()}
    </span>
</div>
