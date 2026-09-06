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
    class="border-accent relative z-100 mx-0 {containerClass} rounded-4xl border-4 text-white outline-5 outline-black 2xl:-mx-40"
>
    <div bind:this={waveSlotEl} class="absolute inset-0 z-0 h-full w-full rounded-4xl"></div>
    <div class="absolute inset-0 z-1 rounded-4xl bg-black/40"></div>
    <div class="{className} absolute inset-0 z-5 rounded-4xl mix-blend-plus-lighter"></div>
    <div class="relative z-10 p-9 {innerClass}">
        {@render children()}
    </div>
</div>
