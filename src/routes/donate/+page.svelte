<script lang="ts">
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
</script>

<!-- some of the most batshit stupid shit ever written -->
<div class="relative overflow-visible">
    <PageContainer className="bg-pink-500/90 text-white">
        <div class="flex flex-col gap-8 xl:flex-row xl:items-start xl:justify-between">
            <!-- Text Column -->
            <div class="max-w-210 font-medium">
                <h1 class="text-4xl md:text-6xl">Build a better Solync.</h1>
                <p class="mt-4 text-2xl">
                    Solync is a software startup based in Texas, United States. We're a collective of thinkers who like to showcase our work
                    while staying ethical to the end user. We run scalable services (StreamSkinner, Gardens Wiki) without any CEO, board, or
                    hierarchy. If you send us money, you'll help us scale and build a better Solync.
                </p>
                <p class="mt-4 text-2xl">
                    Our greatest priority is giving back to users and empowering them with cool stuff, whether it be software or something
                    else we find interesting. We wish to create a pleasant end-user experience that's sustainable, ethical, and really cool!
                </p>
                <p class="mt-4 mb-6 text-2xl">
                    We need a way to scale to build better software, and funding us helps keep Solync on that path towards sustainability.
                    Your contributions are greatly appreciated and will not go to waste. We believe in transparency, so we plan to build a
                    platform where users can view all of our donations, earnings, and more!
                </p>
            </div>

            <div class="relative z-20 h-150 w-full shrink-0 xl:-mt-16 xl:-mb-16 xl:w-96">
                <div class="pointer-events-auto overflow-hidden rounded-3xl shadow-2xl xl:hidden">
                    <iframe
                        id="kofiframe"
                        class="rounded-3xl"
                        src="https://ko-fi.com/solync/?hidefeed=true&widget=true&embed=true"
                        style="border:none;background:var(--color-white); box-shadow:none;width:100%;"
                        height="600"
                        title="solync"
                    ></iframe>
                </div>
            </div>
        </div>
    </PageContainer>

    <div class="pointer-events-none absolute top-9 right-22 z-200 hidden xl:block xl:translate-x-12">
        <div class="pointer-events-auto overflow-hidden rounded-3xl shadow-2xl">
            <iframe
                id="kofiframe"
                class="rounded-3xl"
                src="https://ko-fi.com/solync/?hidefeed=true&widget=true&embed=true"
                style="border:none;background:var(--color-white); box-shadow:none;"
                width="400"
                height="600"
                title="solync"
            ></iframe>
        </div>
    </div>
</div>
