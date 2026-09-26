<script lang="ts">
    interface Partner {
        src: string;
        alt: string;
        href?: string;
    }

    let {
        partners = [
            {
                src: '/images/partners/untone.svg',
                alt: 'Untone logo',
                href: 'https://untone.org/'
            }
        ]
    }: { partners?: Partner[] } = $props();
</script>

<section>
    <div class="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
        {#each partners as partner}
            {#snippet partnerImg()}
                <enhanced:img src={partner.src} alt={partner.alt} class="h-full w-full object-contain" />
            {/snippet}

            {#if partner.href}
                <a href={partner.href} target="_blank" rel="noopener noreferrer" class="relative flex items-center">
                    {@render partnerImg()}
                </a>
            {:else}
                <div class="bg-accent relative flex items-center">
                    {@render partnerImg()}
                </div>
            {/if}
        {/each}
    </div>
</section>
