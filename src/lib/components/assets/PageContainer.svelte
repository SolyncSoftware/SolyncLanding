<script lang="ts">
    import Waves from './Waves.svelte';

    let {
        children,
        showDim = true,
        className = 'bg-accent',
        wavesClass = 'absolute inset-0 z-0 h-full w-full overflow-hidden mix-blend-plus-lighter',
        wavesStyle = 'z-index: -1; overflow: hidden; mask-image: linear-gradient(to right, #fff6 20%, #fffa, #fff);',
        innerClass = '',
        containerClass = 'overflow-hidden',
        wavesType = '/solync_waves_dark.json'
    } = $props();
</script>

<div class="border-offwhite relative z-100 mx-0 overflow-hidden rounded-4xl border-8 text-white 2xl:-mx-10 {containerClass}">
    <Waves className={wavesClass} style={wavesStyle} {wavesType} backgroundImage="/images/waves-dark.png" backgroundSize="cover" />

    {#if showDim}
        <div class="absolute inset-0 z-1 bg-black/40"></div>
    {/if}

    {#if className}
        <div class="{className} pointer-events-none absolute inset-0 z-5 mix-blend-plus-lighter"></div>
    {/if}

    <div class="relative z-10 p-6 sm:p-9 {innerClass}">
        {@render children()}
    </div>
</div>
