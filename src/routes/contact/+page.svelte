<script lang="ts">
    import Textbox from '$lib/components/Textbox.svelte';
</script>

<h1 class="text-5xl font-bold">CONTACT US</h1>
<div class="border-t-accent mt-6 h-auto w-301 border-t-11 bg-black/50 p-8">
    <div class="grid grid-cols-2 gap-4 font-sans text-2xl">
        <div class="mb-35 flex w-full flex-col gap-6">
            <div class="flex items-center gap-4">
                <img src="/@placeholder.png" alt="Contact Us" class="h-18 w-18 object-cover" />
                <div class="font-display flex flex-col">
                    <span class="text-accent">Email</span>
                    <a href="mailto:hello@netro.works" class="hover:text-white/70 hover:underline">hello@netro.works</a>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <img src="/@placeholder.png" alt="Contact Us" class="h-18 w-18 object-cover" />
                <div class="font-display flex flex-col">
                    <span class="text-accent">Discord</span>
                    <a
                        href="https://discord.gg/HdKeWtV"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hover:text-white/70 hover:underline"
                    >
                        Click to join our server!
                    </a>
                </div>
            </div>

            <div class="flex items-center gap-4">
                <img src="/@placeholder.png" alt="Contact Us" class="h-18 w-18 object-cover" />
                <div class="font-display flex flex-col">
                    <span class="text-accent">GitHub</span>
                    <a
                        href="https://github.com/NetroSoftware"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="hover:text-white/70 hover:underline"
                    >
                        Click to visit our GitHub!
                    </a>
                </div>
            </div>
        </div>

        <!-- wip -->
        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
                <Textbox rows="1" placeholder="Your name" />
                <Textbox rows="1" placeholder="Your email" />
            </div>

            <div class="flex-1">
                <Textbox class="h-full w-full" placeholder="Message content" />
            </div>

            <!-- wip -->
            <a
                href="/submit"
                class="bg-accent hover:bg-accent/70 font-display flex items-center gap-4 self-end py-4 pr-4 pl-7 text-lg font-bold"
            >
                SEND MESSAGE
                <img src="/arrow-default.png" alt="arrow pointing down" />
            </a>
        </div>
    </div>
</div>
