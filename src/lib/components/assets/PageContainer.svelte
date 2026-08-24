<script lang="ts">
    import persistentWaveStore from '$lib/stores/persistentWave.js';

    let { children, className = 'bg-accent' } = $props();

    let waveSlotEl = $state<HTMLDivElement | null>(null);

    $effect(() => {
        const slot = waveSlotEl;
        if (slot) {
            persistentWaveStore.attachTo(slot);

            const ro = new ResizeObserver(() => {
                persistentWaveStore.notifyResize();
            });
            ro.observe(slot);

            return () => {
                ro.disconnect();
                persistentWaveStore.resetToHost(slot);
                persistentWaveStore.notifyResize();
            };
        }
    });
</script>

<div class="border-offwhite relative z-100 mx-0 overflow-hidden rounded-4xl border-8 text-white 2xl:-mx-10">
    <div bind:this={waveSlotEl} class="absolute inset-0 z-0 h-full w-full"></div>
    <div class="absolute inset-0 z-1 bg-black/40"></div>
    <div class="{className} absolute inset-0 z-5 mix-blend-plus-lighter"></div>
    <div class="relative z-10 p-9">
        {@render children()}
    </div>
</div>
