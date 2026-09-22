<script lang="ts">
    import { tryAddScene } from '$lib/utils/unicornLifecycle.js';
    import performanceStore from '$lib/stores/performance.js';
    import persistentWaveStore from '$lib/stores/persistentWave.js';
    import { tick } from 'svelte';
    import type { UnicornScene } from '$lib/utils/unicornTypes.js';

    let {
        style = '',
        className = '',
        backgroundImage = '/images/waves-dark.png',
        backgroundSize = 'cover',
        wavesType = '/solync_waves_dark.json',
        enabled = undefined
    } = $props<{
        style?: string;
        className?: string;
        backgroundImage?: string;
        backgroundSize?: string;
        wavesType?: string;
        enabled?: boolean;
    }>();

    let waveContainerEl = $state<HTMLDivElement | null>(null);
    let embedEl = $state<HTMLDivElement | null>(null);

    const autoUnicornEnabled = $derived(
        !$performanceStore.checked || $performanceStore.canUseWebgl && !$performanceStore.globalHardDisabled
    );
    const unicornEnabled = $derived(enabled !== undefined ? enabled : autoUnicornEnabled);
    const showPlaceholder = $derived(!unicornEnabled);
    let scene = $state<UnicornScene | null>(null);

    $effect(() => {
        if (waveContainerEl) {
            persistentWaveStore.setWave(waveContainerEl);
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
                        scale: 0.8,
                        dpi: 1,
                        fps: 60
                    })
                } else {
                    scene?.destroy();
                    scene = null;
                }
            })
        }

        return () => {
            cancelled = true;
        };
    });
</script>

<div bind:this={waveContainerEl} class="absolute inset-0 overflow-hidden {className}" {style}>
    <div
        aria-hidden="true"
        class="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300 {unicornEnabled ? 'opacity-100' : 'opacity-0'}"
    >
        <div
            bind:this={embedEl}
            class="unicorn-embed absolute inset-0"
        ></div>
    </div>
    <div
        class="absolute inset-0 z-0 transition-opacity duration-300 {showPlaceholder ? 'opacity-100' : 'opacity-0'}"
        style="background-image: url({backgroundImage}); background-size: {backgroundSize}; background-position: center;"
    ></div>
</div>
