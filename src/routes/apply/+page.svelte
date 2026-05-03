<script lang="ts">
    import Textbox from '$lib/components/Textbox.svelte';
</script>

<h1 class="text-5xl font-bold">WORK AT NETRO</h1>

<div class="border-t-accent mt-6 h-auto w-301 border-t-11 bg-black/50 p-8 font-sans">
    <!-- <div class="mb-6 grid grid-cols-2 gap-4">
        <Textbox rows="1" placeholder="Your name" />
        <Textbox rows="1" placeholder="Your email" />
    </div> -->

    <div class="mb-6 flex flex-row justify-between gap-4 text-xl">
        <div class="flex w-full flex-col gap-6">
            <Textbox rows="1" placeholder="Your name" />
            <Textbox rows="1" placeholder="Your email" />

            <div class="flex w-full flex-col gap-2">
                <span>How did you discover Netro?</span>
                <!-- todo: make this look nicer ig lol -->
                <select class="border-accent/50 focus:ring-accent border bg-black px-5 py-4 text-white placeholder:text-white/50">
                    <option value="" disabled selected>Please select one</option>
                    <option value="social-media">Social Media</option>
                    <option value="partners">Partners</option>
                    <option value="referral">Referral</option>
                    <option value="word-of-mouth">Word of mouth</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="flex w-full flex-col gap-2">
                <p>If you can't include a resume, please include a link to your portfolio site.</p>
                <Textbox rows="1" placeholder="Your portfolio site" />
            </div>
        </div>
        <!-- todo: add file upload functionality -->
        <div class="flex w-full flex-col gap-6">
            <p class="max-w-90">Attach your documents. Please include a resume (.doc, .docx, .pdf).</p>
            <div class="border-accent/80 flex flex-1 cursor-pointer flex-col items-center justify-center border-2 border-dashed bg-black">
                <span class="text-accent font-bold">Choose files</span>
                <span class="text-white/44">or drop them here</span>
            </div>
            <span><span class="text-accent font-bold underline underline-offset-5">Choose files</span>. No files chosen</span>
        </div>
    </div>

    <!-- button -->
    <div class="flex justify-end">
        <a
            href="/submit"
            class="bg-accent hover:bg-accent/70 font-display flex items-center gap-4 self-end py-4 pr-4 pl-7 text-lg font-bold"
        >
            SEND APPLICATION
            <img src="/images/arrow-default.png" alt="arrow pointing down" />
        </a>
    </div>
</div>
