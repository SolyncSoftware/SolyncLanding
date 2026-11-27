<script lang="ts">
    import type { Article } from '#lib/utils/types.js';
    import type { EmblaCarouselType } from 'embla-carousel';
    import SmallPost from './SmallPost.svelte';
    import useEmblaCarousel from 'embla-carousel-svelte';
    import Autoplay from 'embla-carousel-autoplay';
    import { untrack } from 'svelte';

    let { posts = [] as Article[], count = 6, autoplay = true, autoplayDelay = 3000 } = $props();

    const autoplayPlugin = Autoplay({
        delay: untrack(() => autoplayDelay),
        stopOnInteraction: false,
        stopOnMouseEnter: true
    });

    const MAX_DROP_PX = 45;

    let perCopy = $derived(posts.slice(0, count));
    let slides = $derived([...perCopy, ...perCopy, ...perCopy]);

    let emblaApi: EmblaCarouselType | undefined;

    function onEmblaInit(event: CustomEvent<EmblaCarouselType>) {
        emblaApi = event.detail;
        emblaApi.on('scroll', updateStagger).on('select', handleSeam).on('reInit', handleSeam);
        handleSeam();
    }

    function handleSeam() {
        if (!emblaApi) return;
        const n = perCopy.length;
        if (n === 0) return;
        const index = emblaApi.selectedScrollSnap();
        if (index < n) {
            emblaApi.scrollTo(index + n, true);
        } else if (index >= 2 * n) {
            emblaApi.scrollTo(index - n, true);
        }
        updateStagger();
    }

    function updateStagger() {
        if (!emblaApi) return;
        const viewportCenter = window.innerWidth / 2;

        for (const card of emblaApi.slideNodes()) {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distanceFromCenter = Math.abs(viewportCenter - cardCenter);
            const normalizedDistance = Math.min(distanceFromCenter / viewportCenter, 1);
            const translateY = normalizedDistance * MAX_DROP_PX;
            card.style.transform = `translateY(${translateY}px)`;
        }
    }
</script>

<svelte:window onresize={updateStagger} />

<section class="-mx-5 flex w-auto flex-col gap-4 2xl:-mx-70">
    {#if posts.length === 0}
        <p class="text-xl text-black">No articles found.</p>
    {:else}
        <div class="embla">
            <div
                class="embla__viewport"
                use:useEmblaCarousel={{
                    options: { align: 'center', loop: false },
                    plugins: [autoplayPlugin]
                }}
                onemblaInit={onEmblaInit}
            >
                <div class="embla__container flex gap-4">
                    {#each slides as article}
                        <div class="embla__slide">
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
                    {/each}
                </div>
            </div>
        </div>
    {/if}
</section>

<style scoped>
    .embla__viewport {
        overflow-x: hidden;
        padding-top: 4rem;
        padding-bottom: 2.8rem;
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

    @media (min-width: 768px) {
        .embla__slide {
            flex-basis: 25rem;
        }
    }
</style>
