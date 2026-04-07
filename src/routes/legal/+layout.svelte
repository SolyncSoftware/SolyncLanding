<script lang="ts">
    import { page } from '$app/state';
    let { children } = $props();
    const title = page.data.title;

    console.log(page.data);
</script>

<!-- <section class="-mx-16 grid min-h-screen">
    <div class="z-10 col-start-1 row-start-1 flex flex-col items-start gap-12 p-21">
        <h1 class="font-display text-5xl leading-16 font-bold">{title}Placeholder</h1>
        <div class="border-t-accent h-auto w-301 border-t-11 bg-black p-6">
            <span class="font-sans text-2xl">
                {@render children()}
            </span>
        </div>
    </div>
</section> -->

<h1 class="text-5xl font-bold">VERY COOL TITLE</h1>
<div class="border-t-accent mt-6 h-auto w-301 border-t-11 bg-black p-8">
    <span class="font-sans text-2xl">
        {@render children()}
    </span>
</div>
