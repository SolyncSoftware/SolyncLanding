<script>
    const services = [
        {
            title: 'NETROHOST',
            href: 'https://netro.host/',
            imageSrc: '/placeholder.svg',
            alt: 'screenshot of netrohost'
        },
        {
            title: 'GARDENS WIKI',
            href: 'https://alpha.potaro.wiki/news/gardens-wiki',
            imageSrc: '/placeholder2.svg',
            alt: 'screenshot of gardens wiki'
        },
        {
            title: 'THEACEAE COLLECTIVE',
            href: 'https://theaceae.org/',
            imageSrc: '/placeholder.svg',
            alt: 'screenshot of theaceae collective'
        }
    ];
</script>

<section id="what-we-do">
    <span class="font-display text-[140px]"><span class="text-accent">WHAT</span> WE DO</span>
    <div class="flex w-full flex-col items-start gap-8.5">
        {#each services as service}
            <div class="relative w-full">
                <img
                    loading="lazy"
                    src={service.imageSrc}
                    alt={service.alt}
                    class="h-auto max-h-95 w-full object-cover pt-8 pr-42 pb-4.5 pl-10"
                />
                <span class="font-display bg-accent absolute top-0 left-0 z-10 py-3.5 pr-44 pl-7 text-6xl font-bold text-black">
                    {service.title}
                </span>
                <a
                    href={service.href}
                    class="bg-accent hover:bg-accent/90 absolute right-0 bottom-0 z-10 flex items-center gap-4 py-3.5 pr-2 pl-34"
                >
                    <span class="font-display text-3xl">VIEW</span>
                    <img src="/arrow-default.png" alt="arrow pointing right" class="-rotate-90" />
                </a>
            </div>
        {/each}
    </div>
</section>
