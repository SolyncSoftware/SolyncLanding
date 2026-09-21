<script lang="ts">
    import persistentWaveStore from '$lib/stores/persistentWave.js';

    let { children, className = 'bg-accent', innerClass = '', containerClass = 'overflow-hidden' } = $props();

    let pageContainerEl = $state<HTMLDivElement | null>(null);
    let waveSlotEl = $state<HTMLDivElement | null>(null);

    $effect(() => {
        const container = pageContainerEl;
        const slot = waveSlotEl;
        if (container && slot) {
            persistentWaveStore.attachTo(slot);

            const ro = new ResizeObserver(() => {
                persistentWaveStore.notifyResize();
            });
            ro.observe(container);
            ro.observe(slot);

            return () => {
                ro.disconnect();
                persistentWaveStore.resetToHost(slot);
                persistentWaveStore.notifyResize();
            };
        }
    });
</script>

<div
    bind:this={pageContainerEl}
    class="border-offwhite relative z-100 mx-0 overflow-hidden rounded-4xl border-8 text-white 2xl:-mx-10 {containerClass}"
>
    <div bind:this={waveSlotEl} class="absolute inset-0 z-0 h-full w-full rounded-4xl"></div>
    <div class="absolute inset-0 z-1 bg-black/40"></div>
    <div class="{className} absolute inset-0 z-5 mix-blend-plus-lighter"></div>
    <div class="relative z-10 p-6 pt-8 {innerClass}">
        {@render children()}
    </div>
</div>
