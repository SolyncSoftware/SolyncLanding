<script lang="ts">
    import Textbox from '$lib/components/Textbox.svelte';
</script>

<!-- todo: waiting for the global title pages. also heavily reconsidering redesigning this because it looks poop. 
 the button isnt good because it needs to be outside the container while the textbox needs to span the container's height -->

<h1 class="text-5xl font-bold">CONTACT US</h1>
<div class="border-t-accent mt-6 h-auto w-301 border-t-11 bg-black/50 p-8">
    <div class="grid grid-cols-2 gap-4 font-sans text-2xl">
        <div class="flex w-full flex-col gap-6">
            <div class="flex items-center gap-4">
                <img src="/@placeholder.png" alt="Contact Us" class="h-18 w-18 object-cover" />
                <div class="font-display flex flex-col">
                    <span class="text-accent">Email</span>
                    <span>hello@netro.works</span>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <img src="/@placeholder.png" alt="Contact Us" class="h-18 w-18 object-cover" />
                <div class="font-display flex flex-col">
                    <span class="text-accent">Email</span>
                    <span>hello@netro.works</span>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <img src="/@placeholder.png" alt="Contact Us" class="h-18 w-18 object-cover" />
                <div class="font-display flex flex-col">
                    <span class="text-accent">Email</span>
                    <span>hello@netro.works</span>
                </div>
            </div>
        </div>

        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
                <Textbox />
                <Textbox />
            </div>
            <Textbox />

            <!-- utter shit -->
            <a
                href="/apply"
                class="bg-accent hover:bg-accent/70 font-display flex items-center justify-end gap-4 py-4 pr-4 pl-7 text-lg font-bold"
            >
                SEND MESSAGE
                <img src="/arrow-default.png" alt="arrow pointing down" />
            </a>
        </div>
    </div>
</div>
