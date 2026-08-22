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
    <div class="grid grid-cols-1 gap-5 md:grid-cols-3">
        {#each partners as partner}
            {#snippet partnerImg()}
                <enhanced:img src={partner.src} alt={partner.alt} class="h-full w-full object-contain" />
            {/snippet}

            {#if partner.href}
                <a
                    href={partner.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="group hover:bg-offaccent relative flex items-center rounded-2xl bg-black p-10 transition-all"
                >
                    {@render partnerImg()}
                </a>
            {:else}
                <div class="bg-accent relative flex items-center p-10">
                    {@render partnerImg()}
                </div>
            {/if}
        {/each}
    </div>
</section>
