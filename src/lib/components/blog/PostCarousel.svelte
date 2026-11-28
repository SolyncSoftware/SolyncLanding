<script lang="ts">
    import type { Article } from '#lib/utils/types.js';
    import type { EmblaCarouselType } from 'embla-carousel';
    import SmallPost from './SmallPost.svelte';
    import useEmblaCarousel from 'embla-carousel-svelte';
    import Autoplay from 'embla-carousel-autoplay';
    import { untrack } from 'svelte';

    let { posts = [] as Article[], count = 10, autoplay = true, autoplayDelay = 3000 } = $props();

    const autoplayPlugin = Autoplay({
        delay: untrack(() => autoplayDelay),
        stopOnInteraction: false,
        stopOnMouseEnter: true
    });

    const MAX_DROP_PX = 45;

    let emblaApi: EmblaCarouselType | undefined;
    let rafId = 0;

    function onEmblaInit(event: CustomEvent<EmblaCarouselType>) {
        emblaApi = event.detail;
        emblaApi.on('scroll', scheduleStagger).on('reInit', scheduleStagger).on('select', scheduleStagger).on('settle', scheduleStagger);
        scheduleStagger();
    }

    // Throttle to one layout pass per frame (scroll fires many times per frame).
    function scheduleStagger() {
        if (rafId) return;
        rafId = requestAnimationFrame(() => {
            rafId = 0;
            updateStagger();
        });
    }

    function updateStagger() {
        if (!emblaApi) return;
        const viewportCenter = window.innerWidth / 2;

        for (const slide of emblaApi.slideNodes()) {
            const inner = slide.firstElementChild as HTMLElement | null;
            if (!inner) continue;

            const rect = slide.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distanceFromCenter = Math.abs(viewportCenter - cardCenter);
            const normalizedDistance = Math.min(distanceFromCenter / viewportCenter, 1);
            const translateY = normalizedDistance * MAX_DROP_PX;

            inner.style.transform = `translateY(${translateY}px)`;
        }
    }

    const visiblePosts = $derived(posts.slice(0, count));

    const slides = $derived([...visiblePosts, ...visiblePosts]);
</script>

<svelte:window onresize={scheduleStagger} />

<section class="-mx-5 flex w-auto flex-col gap-4 2xl:-mx-70">
    {#if posts.length === 0}
        <p class="text-xl text-black">No articles found.</p>
    {:else}
        <div class="embla">
            <div
                class="embla__viewport"
                use:useEmblaCarousel={{
                    options: {
                        align: 'center',
                        loop: true,
                        slidesToScroll: 1,
                        containScroll: false,
                        dragFree: true
                    },
                    plugins: autoplay ? [autoplayPlugin] : []
                }}
                onemblaInit={onEmblaInit}
            >
                <div class="embla__container flex gap-4">
                    {#each slides as article, i (i)}
                        <div class="embla__slide">
                            <div class="embla__slide-inner">
                                <SmallPost
                                    date={article.date}
                                    title={article.title}
                                    description={article.description}
                                    link={article.slug}
                                    category={article.categories[0]}
                                    image={article.image || '/images/articles/fallback.png'}
                                    mobile={article.mobile}
                                />
                            </div>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</section>

<style scoped>
    .embla__viewport {
        overflow: hidden;
        padding-top: 4rem;
        padding-bottom: 1.25rem;
        padding-left: 1.25rem;
        padding-right: 1.25rem;
    }

    .embla__container {
        display: flex;
        touch-action: pan-y pinch-zoom;
    }

    .embla__slide {
        flex: 0 0 20rem;
        min-width: 0;
    }

    .embla__slide-inner {
        will-change: transform;
    }

    @media (min-width: 768px) {
        .embla__slide {
            flex-basis: 25rem;
        }
    }
</style>
