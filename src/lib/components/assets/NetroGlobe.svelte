<script lang="ts">
    import { onMount, tick } from 'svelte';

    export let style = '';
    export let className = '';
    export let wavesType = '/netro_glyph_old.json';
    export let backgroundImage = '/images/logo-ascii.png';
    export let backgroundSize = 'contain';
    export let autoFallback = true;
    export let fpsThreshold = 45;
    export let sampleDurationMs = 1000;

    let useWebgl = false;
    let embedEl: HTMLDivElement | null = null;

    async function initUnicorn() {
        await tick();
        if (!embedEl || typeof UnicornStudio === 'undefined') {
            return;
        }
        UnicornStudio.init().catch(console.error);
    }

    onMount(() => {
        let isMounted = false;

        if (!autoFallback) {
            useWebgl = true;
            initUnicorn();

            return () => {
                isMounted = true;
            };
        }

        if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
            return;
        }

        let frameCount = 0;
        let startTime = performance.now();
        let raf = 0;

        const perfCheck = (now: number) => {
            frameCount++;

            if (now - startTime >= sampleDurationMs) {
                const framesAvg = (now - startTime) / frameCount;
                if (1000 / framesAvg >= fpsThreshold) {
                    useWebgl = true;
                    void initUnicorn();
                }
                return;
            }
            raf = requestAnimationFrame(perfCheck);
        };

        raf = requestAnimationFrame(perfCheck);

        return () => {
            isMounted = false;
            cancelAnimationFrame(raf);
        };
    });
</script>

<div class={`relative overflow-hidden ${className}`} style={`width:100%; ${style}`}>
    <div
        class="absolute inset-0 z-0"
        style={`background-image: url(${backgroundImage}); background-size: ${backgroundSize}; background-position: center;`}
    ></div>

    {#if useWebgl}
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
