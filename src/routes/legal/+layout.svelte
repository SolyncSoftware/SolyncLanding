<script lang="ts">
    import { page } from '$app/state';
    let { children } = $props();
    const title = page.data.title;
</script>

<section class="-mx-16 grid min-h-screen">
    <div class="z-10 col-start-1 row-start-1 flex flex-col items-start gap-12 p-21">
        <!-- page content -->
        <h1 class="font-display text-5xl leading-16 font-bold">{title}</h1>
        <div class="border-t-accent h-auto w-301 border-t-11 bg-black p-6">
            <span class="font-sans text-2xl">
                {@render children()}
            </span>
        </div>
    </div>
</section>
