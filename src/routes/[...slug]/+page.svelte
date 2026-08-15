<!--
    Displays articles based on their slug.
    Example: articles/legal/privacy.md is available at :///legal/privacy
-->

<script lang="ts">
    import { ogImage, title as siteTitle, description as siteDescription, url } from '$lib/config.js';

    let { data } = $props();
    let Content = $derived(data.content);

    console.log(siteTitle, siteDescription, ogImage, url);
</script>

<svelte:head>
    <title>{`${siteTitle} / ${data.meta?.title}`}</title>
    <meta name="description" content={data.meta?.description ?? siteDescription} />
    <meta property="og:title" content={`${data.meta?.title} | ${siteTitle}`} />
    <meta property="og:description" content={data.meta?.description ?? siteDescription} />
    <meta
        property="og:image"
        content={data.meta?.image ? (data.meta.image.startsWith('http') ? data.meta.image : `${url}${data.meta.image}`) : ogImage}
    />
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:title" content={`${data.meta?.title} | ${siteTitle}`} />
    <meta property="twitter:description" content={data.meta?.description ?? siteDescription} />
    <meta
        property="twitter:image"
        content={data.meta?.image ? (data.meta.image.startsWith('http') ? data.meta.image : `${url}${data.meta.image}`) : ogImage}
    />
</svelte:head>

<Content />
