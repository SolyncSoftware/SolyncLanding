<script lang="ts">
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
</script>

<!-- some of the most batshit stupid shit ever written -->
<div class="relative overflow-visible">
    <PageContainer className="bg-pink-500/90">
        <div class="flex flex-row">
            <div class="flex flex-col justify-between xl:flex-row">
                <div class="max-w-210 min-w-0 font-medium">
                    <h1 class="text-4xl font-bold md:text-6xl">Build a better Solync.</h1>
                    <p class="mt-4 text-lg md:text-2xl">
                        Solync is a software startup based in Texas, United States. We're a collective of thinkers who like to showcase our
                        work while staying ethical to the end user. We run scalable services (StreamSkinner, Gardens Wiki) without any CEO,
                        board, or hierarchy. If you send us money, you'll help us scale and build a better Solync.
                    </p>
                    <p class="mt-4 text-lg md:text-2xl">
                        Our greatest priority is giving back to users and empowering them with cool stuff, whether it be software or
                        something else we find interesting. We wish to create a pleasant end-user experience that's sustainable, ethical,
                        and really cool!
                    </p>
                    <p class="mt-4 mb-6 text-lg md:text-2xl">
                        We need a way to scale to build better software, and funding us helps keep Solync on that path towards
                        sustainability. Your contributions are greatly appreciated and will not go to waste. We believe in transparency, so
                        we plan to build a platform where users can view all of our donations, earnings, and more!
                    </p>
                </div>
            </div>
            <div class="pointer-events-none z-200 flex-2 shrink-0 xl:block xl:translate-x-12 xl:pr-12">
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
    </PageContainer>
</div>
