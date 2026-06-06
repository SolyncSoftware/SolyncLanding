<script lang="ts">
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
</script>

<PageContainer>
    <div class="flex flex-row justify-between">
        <div>
            <h1 class="text-4xl font-bold md:text-5xl">Build a better Solync.</h1>
            <p class="mt-4 text-lg font-semibold md:max-w-170 md:text-2xl">
                We're Solync. We create software like StreamSkinner, Gardens Wiki, and more.
            </p>
            <p class="mt-4 text-lg font-semibold md:max-w-170 md:text-2xl">
                We're an independent software collective creating user-first experiences. It's not only because we love to, but we think
                it's ethical. We collaborate to create what's next.
            </p>
        </div>
        <div class="overflow-hidden rounded-3xl">
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
</PageContainer>
