<script lang="ts">
    import Waves from './Waves.svelte';

    let { children, className = 'bg-accent', innerClass = '', containerClass = 'overflow-hidden' } = $props();
</script>

<div
    class="border-offwhite relative z-100 mx-0 overflow-hidden rounded-4xl border-8 text-white 2xl:-mx-10 {containerClass}"
>
    <Waves
        className="absolute inset-0 z-0 h-full w-full rounded-4xl overflow-hidden mix-blend-plus-lighter"
        style="z-index: -1; overflow: hidden; mask-image: linear-gradient(to right, #fff6 20%, #fffa, #fff);"
        wavesType="/solync_waves_dark.json"
        backgroundImage="/images/waves-dark.png"
        backgroundSize="cover"
    />
    <div class="absolute inset-0 z-1 bg-black/40"></div>
    <div class="{className} absolute inset-0 z-5 mix-blend-plus-lighter"></div>
    <div class="relative z-10 p-6 sm:p-9 {innerClass}">
        {@render children()}
    </div>
</div>
