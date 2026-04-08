<script lang="ts">
    interface Partner {
        src: string;
        alt: string;
        href?: string;
    }
    export let partners: Partner[] = [
        {
            src: '/untone.svg',
            alt: 'Untone logo',
            href: 'https://untone.org/'
        },
        {
            src: '/placeholder2.svg',
            alt: 'Placeholder logo',
            href: 'https://untone.org/'
        }
    ];
</script>

<section>
    <div class="grid grid-cols-3 gap-5">
        {#each partners as partner}
            {#snippet partnerImg()}
                <img src={partner.src} alt={partner.alt} class="h-full w-full object-contain" />
            {/snippet}
            <div class="border-accent relative items-center border-2 bg-black/50 p-10">
                {#if partner.href}
                    <a href={partner.href} target="_blank" rel="noopener noreferrer" aria-label={partner.alt}>
                        {@render partnerImg()}
                    </a>
                {:else}
                    {@render partnerImg()}
                {/if}
            </div>
        {/each}
    </div>
</section>
