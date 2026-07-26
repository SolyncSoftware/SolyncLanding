<script lang="ts">
    import { onDestroy, tick } from 'svelte';
    import performanceStore from '$lib/stores/performance.js';
    import { disposeUnicorn, initIfAllowed, stopUnicorn } from '$lib/utils/unicornLifecycle.js';

    let { style = '', className = '', wavesType = '', backgroundImage = '/images/waves.png', backgroundSize = 'cover' } = $props();

    let embedEl = $state<HTMLDivElement | null>(null);
    const active = $derived($performanceStore.checked && $performanceStore.canUseWebgl && !$performanceStore.globalHardDisabled);

    $effect(() => {
        let cancelled = false;

        if (active) {
            tick().then(() => {
                if (!cancelled && embedEl) initIfAllowed(embedEl);
            });
        } else {
            stopUnicorn();
        }

        return () => {
            cancelled = true;
        };
    });

    onDestroy(() => {
        disposeUnicorn();
    });
</script>

<div class="relative overflow-hidden {className}" style="position: absolute; top: 0; left: 0; width: 100%; {style}">
    <div
        class="absolute inset-0 z-0"
        style="background-image: url({backgroundImage}); background-size: {backgroundSize}; background-position: center;"
    ></div>

    {#if active}
        <div
            bind:this={embedEl}
            class="unicorn-embed pointer-events-none absolute inset-0 z-1"
            data-us-project-src={wavesType}
            data-us-lazyload="true"
            data-us-scale="0.8"
            data-us-dpi="1"
            data-us-fps="60"
        ></div>
    {/if}
</div>
