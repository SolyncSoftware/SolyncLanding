<script lang="ts">
    let { children }: { children: Snippet } = $props();
    import { type Snippet } from 'svelte';

    import Waves from './Waves.svelte';
</script>

<div class="border-offwhite relative z-100 w-full overflow-hidden rounded-4xl border-4 text-white">
    <div class="absolute inset-0 z-1 bg-black/10"></div>

    <Waves
        className="h-full overflow-hidden"
        style="z-index: -1; overflow: hidden;"
        wavesType="/solync_waves.json"
        backgroundImage="/images/waves.png"
        backgroundSize="cover"
    />
    <div class="relative z-10 p-12">
        {@render children()}
    </div>
</div>
