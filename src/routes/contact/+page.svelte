<script lang="ts">
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import Textbox from '$lib/components/Textbox.svelte';
    import Button from '$lib/components/Button.svelte';
</script>

<section class="flex flex-col gap-14">
    <PageContainer className="bg-emerald-600">
        <div class="flex flex-col justify-between xl:flex-row xl:pr-24">
            <div class="max-w-200 font-medium">
                <h1 class="max-w-190 text-4xl font-bold md:text-6xl">Contacting Solync.</h1>

                <p class="mt-4 text-lg md:text-2xl">hello@solync.org. click to join our server</p>

                <p class="mt-4 text-lg md:text-2xl">click to visit our github</p>
            </div>
        </div>
    </PageContainer>

    <div class="rounded-4xl bg-white p-9 shadow-xl/4">
        <h2 class="mb-4 text-3xl font-bold">Contact us!</h2>

        <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
                <Textbox rows="1" placeholder="Your name" />
                <Textbox rows="1" placeholder="Your email" />
            </div>
            <div class="flex flex-col gap-1 text-lg">
                <span>Reason for contact</span>
                <select
                    class="focus:ring-accent bg-offwhite rounded-full border border-none px-5 py-4 text-black placeholder:text-white/50"
                >
                    <option value="" disabled selected>Please select one</option>
                    <option value="support">Support</option>
                    <option value="question">Questions</option>
                    <option value="partners">Partners</option>
                    <option value="trust-and-safety">Trust and Safety</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div class="flex-1">
                <Textbox class="h-full w-full rounded-4xl!" placeholder="Message content" />
            </div>

            <Button href="/submit" text="Send message" class="text-lg!" />
        </div>
    </div>
</section>
