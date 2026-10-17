<script lang="ts">
    import * as persistentWaves from '$lib/stores/persistentWave.js';
    import type { PersistentWaveStoreState } from '$lib/stores/persistentWave.js';
    import { type Snippet } from 'svelte';
    import type { Writable } from 'svelte/store';

    let {
        children,
        className = 'bg-accent',
        wavesStyle = 'z-index: -1; overflow: hidden; mask-image: linear-gradient(to right, #fff6 20%, #fffa, #fff);',
        innerClass = '',
        containerClass = '',
        waveStore
    }: {
        children: Snippet;
        showDim?: boolean;
        className?: string;
        wavesStyle?: string;
        innerClass?: string;
        containerClass?: string;
        waveStore: Writable<PersistentWaveStoreState>;
    } = $props();

    let pageContainerEl = $state<HTMLDivElement | null>(null);
    let waveSlotEl = $state<HTMLDivElement | null>(null);
    let dots = $derived(waveStore === persistentWaves.stores.dottyLogo);

    function hex(color: string) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim();

        ctx.fillStyle = getComputedStyle(document.documentElement).backgroundColor;
        ctx.fillRect(0, 0, 1, 1);
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, 1, 1);

        return `#${Array.from(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3))
            .map((value) => value.toString(16).padStart(2, '0'))
            .join('')}`;
    }

    $effect(() => {
        const container = pageContainerEl;
        const slot = waveSlotEl;
        if (container && slot) {
            const variables = dots
                ? {
                      'Background Color': hex(getComputedStyle(container).backgroundColor),
                      'Dot Color': '#ffffff'
                  }
                : undefined;
            persistentWaves.attachTo(waveStore, slot, variables);

            const ro = new ResizeObserver(() => {
                persistentWaves.notifyResize();
            });
            ro.observe(container);
            ro.observe(slot);

            return () => {
                ro.disconnect();
                persistentWaves.resetToHost(waveStore, slot);
                persistentWaves.notifyResize();
            };
        }
    });
</script>

<div
    bind:this={pageContainerEl}
    class="border-offwhite relative z-100 mx-0 overflow-hidden rounded-4xl border-8 text-white 2xl:-mx-10 {dots
        ? className
        : ''} {containerClass}"
>
    <div bind:this={waveSlotEl} style={wavesStyle} class="absolute inset-0 z-0 h-full w-full rounded-4xl"></div>

    {#if className && !dots}
        <div class="{className} pointer-events-none absolute inset-0 z-5 mix-blend-plus-lighter"></div>
    {/if}

    <div class="relative z-10 p-6 sm:p-9 {innerClass}">
        {@render children()}
    </div>
</div>
