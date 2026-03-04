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
        }
    ];
</script>

<section class="pb-15">
    <span class="font-display text-[140px]">OUR <span class="text-accent">PARTNERS</span></span>
    <div class="grid grid-cols-3 gap-5">
        {#each partners as partner}
            <div class="relative h-50 overflow-hidden border border-[#222222] px-12">
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
