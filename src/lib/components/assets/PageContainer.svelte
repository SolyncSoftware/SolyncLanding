<script lang="ts">
    import * as persistentWaves from '$lib/stores/persistentWave.js';
    import type { PersistentWaveStoreState } from '$lib/stores/persistentWave.js';
    import { type Snippet } from 'svelte';
    import type { Writable } from 'svelte/store';

    let {
        children,
        showDim = true,
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
    let usesDots = $derived(waveStore === persistentWaves.stores.dottyLogo);

    function getHexColor(color: string) {
        const value = color.match(/^#([\da-f]{6})$/i)?.[1];
        if (value) return `#${value}`;

        const channels = color.match(/[\d.]+/g)?.slice(0, 3).map(Number);
        if (!channels || channels.length < 3) return '#f36647';

        const normalized = color.startsWith('color(') && Math.max(...channels) <= 1;
        return `#${channels
            .map((channel) => Math.round(normalized ? channel * 255 : channel))
            .map((channel) => channel.toString(16).padStart(2, '0'))
            .join('')}`;
    }

    $effect(() => {
        const container = pageContainerEl;
        const slot = waveSlotEl;
        if (container && slot) {
            const variables = usesDots
                ? {
                      'Background Color': getHexColor(getComputedStyle(container).backgroundColor),
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
    class="border-offwhite relative z-100 mx-0 overflow-hidden rounded-4xl border-8 text-white 2xl:-mx-10 {usesDots ? className : ''} {containerClass}"
>
    <div bind:this={waveSlotEl} style={wavesStyle} class="absolute inset-0 z-0 h-full w-full rounded-4xl"></div>

    {#if showDim}
        <div class="absolute inset-0 z-1 bg-black/40"></div>
    {/if}

    {#if className && !usesDots}
        <div class="{className} pointer-events-none absolute inset-0 z-5 mix-blend-plus-lighter"></div>
    {/if}

    <div class="relative z-10 p-6 sm:p-9 {innerClass}">
        {@render children()}
    </div>
</div>
