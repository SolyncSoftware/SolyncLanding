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

<!-- code could be improved  -->
<section>
    <div class="grid grid-cols-3 gap-5">
        {#each partners as partner}
            <div class="border-accent relative overflow-hidden border-2 bg-black/50 p-10">
                {#if partner.href}
                    <a
                        href={partner.href}
                        target="_blank"
                        class="absolute inset-0 z-10 flex items-center justify-center"
                        aria-label={partner.alt}
                    >
                    </a>
                {/if}
                <img src={partner.src} alt={partner.alt} class="h-full w-full object-contain" />
            </div>
        {/each}
    </div>
</section>
