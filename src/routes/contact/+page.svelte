<script lang="ts">
    import PageContainer from '$lib/components/assets/PageContainer.svelte';
    import Textbox from '$lib/components/Textbox.svelte';
    import Button from '$lib/components/Button.svelte';
</script>

<section class="flex flex-col gap-14">
    <PageContainer className="bg-indigo-500">
        <div class="flex flex-col justify-between xl:flex-row xl:pr-24">
            <div class="max-w-200 font-medium">
                <h1 class="max-w-190 text-4xl font-bold md:text-6xl">Contacting Solync.</h1>

                <p class="mt-4 text-lg md:text-2xl">
                    All of our messages are sent to us via Discord webhooks for centralized communication.
                </p>

                <p class="mt-4 text-lg md:text-2xl">
                    If you need customer service regarding any of our projects, please reach out to us on Discord and message @ModMail.
                </p>
            </div>
        </div>
    </PageContainer>

    <span class="text-accent text-7xl font-bold">Coming soon! See news on Discord.</span>
    <div class="rounded-4xl bg-white p-9 shadow-xl/4">
        <h2 class="mb-4 text-3xl font-bold">Contact us</h2>
        <div class="mb-6 flex flex-col justify-between gap-4 text-lg xl:flex-row">
            <div class="flex w-full flex-col gap-6">
                <div class="flex items-center gap-4">
                    <img src="/images/placeholders/@placeholder.svg" alt="Email" class="h-11 w-11 object-cover" />
                    <div class="font-display flex flex-col">
                        <span class="text-accent text-2xl">Email John</span>
                        <a href="mailto:john@solync.org" class="hover:text-accent text-xl hover:underline">john@solync.org</a>
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    <img src="/images/placeholders/@placeholder.svg" alt="Discord" class="h-11 w-11 object-cover" />
                    <div class="font-display flex flex-col">
                        <span class="text-accent text-2xl">Discord</span>
                        <a
                            href="https://discord.gg/nUeRyRtDYC"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="hover:text-accent text-xl hover:underline"
                        >
                            Click to join our Discord
                        </a>
                    </div>
                </div>

                <div class="flex items-center gap-4">
                    <img src="/images/placeholders/@placeholder.svg" alt="GitHub" class="h-11 w-11 object-cover" />
                    <div class="font-display flex flex-col">
                        <span class="text-accent text-2xl">GitHub</span>
                        <a
                            href="https://github.com/SolyncSoftware"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="hover:text-accent text-xl hover:underline"
                        >
                            Click to visit our GitHub
                        </a>
                    </div>
                </div>
            </div>

            <div class="flex w-full flex-col gap-6">
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
            </div>
        </div>

        <div class="flex justify-end">
            <Button href="" text="Send message" class="text-lg!" />
        </div>
    </div>
</section>
