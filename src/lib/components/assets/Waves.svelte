<script lang="ts">
    import performanceStore from '$lib/stores/performance.js';
    import type { PersistentWaveStoreState } from '$lib/stores/persistentWave.js';
    import * as persistentWaves from '$lib/stores/persistentWave.js';
    import { tryAddScene } from '$lib/utils/unicornLifecycle.js';
    import type { UnicornScene } from '$lib/utils/unicornTypes.js';
    import { tick } from 'svelte';
    import { type Writable } from 'svelte/store';

    let {
        style = '',
        className = '',
        backgroundImage,
        backgroundSize,
        wavesType = '/solync_waves_dark.json',
        enabled = undefined,
        scale = 1,
        waveStore
    } = $props<{
        style?: string;
        className?: string;
        backgroundImage?: string;
        backgroundSize?: string;
        wavesType?: string;
        enabled?: boolean;
        scale?: number;
        waveStore: Writable<PersistentWaveStoreState>;
    }>();

    let waveContainerEl = $state<HTMLDivElement | null>(null);
    let embedEl = $state<HTMLDivElement | null>(null);

    const autoUnicornEnabled = $derived(
        !$performanceStore.checked || ($performanceStore.canUseWebgl && !$performanceStore.globalHardDisabled)
    );
    const unicornEnabled = $derived(enabled !== undefined ? enabled : autoUnicornEnabled);
    const showPlaceholder = $derived(!unicornEnabled);
    let scene = $state<UnicornScene | null>(null);

    $effect(() => {
        if (waveContainerEl) {
            persistentWaves.setWave(waveStore, waveContainerEl);
        }
    });

    $effect(() => {
        let cancelled = false;

        if (unicornEnabled) {
            tick().then(async () => {
                if (!cancelled && embedEl && !scene) {
                    scene = await tryAddScene({
                        element: embedEl,
                        filePath: wavesType,
                        lazyLoad: true,
                        fixed: true,
                        production: false,
                        scale: scale,
                        dpi: 1,
                        fps: 60
                    });
                }
            });
        }

        return () => {
            scene?.destroy();
            scene = null;
            cancelled = true;
        };
    });
</script>

<div bind:this={waveContainerEl} class="absolute inset-0 overflow-hidden {className}" {style}>
    <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 {unicornEnabled ? 'opacity-100' : 'opacity-0'}"
    >
        <div bind:this={embedEl} class="unicorn-embed absolute inset-0"></div>
    </div>
    {#if backgroundImage && backgroundSize}
        <div
            class="absolute inset-0 z-0 transition-opacity duration-300 {showPlaceholder ? 'opacity-100' : 'opacity-0'}"
            style="background-image: url({backgroundImage}); background-size: {backgroundSize}; background-position: center;"
        ></div>
    {/if}
</div>
