<script lang="ts">
    let { children, className = 'bg-accent' } = $props();

    import Waves from './Waves.svelte';
</script>

<div class="border-offwhite relative z-100 w-full overflow-hidden rounded-4xl border-4 text-white">
    <div class="absolute inset-0 z-1 bg-black/10"></div>

    <Waves
        className="lg:h-full h-fit overflow-hidden mix-blend-plus-lighter"
        style="z-index: -1; overflow: hidden; mask-image: linear-gradient(to right, #fff6 20%, #fffa, #fff);"
        wavesType="/solync_waves_dark.json"
        backgroundImage="/images/waves-dark.png"
        backgroundSize="cover"
    />
    <div class="{className} absolute inset-0 z-5 mix-blend-plus-lighter"></div>
    <div class="relative z-10 p-12">
        {@render children()}
    </div>
</div>
