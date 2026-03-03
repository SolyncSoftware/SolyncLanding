<script>
    import { SiBluesky, SiDiscord, SiGithub, SiYoutube } from '@icons-pack/svelte-simple-icons';
</script>

<footer>
    <div class="bg-accent flex flex-col gap-8.5 px-16.5 py-9">
        <div class="flex flex-row justify-between">
            <span class="font-display text-[40px] font-bold text-black">&copy; Netro 2026</span>
            <div class="flex flex-row gap-20">
                <div class="flex flex-col gap-5 text-right text-2xl">
                    <a href="/services" class="footer-links">Services</a>
                    <a href="/about" class="footer-links">About us</a>
                    <a href="/apply" class="footer-links">Apply to Netro</a>
                </div>
                <div class="flex flex-col gap-5 text-right text-2xl">
                    <a href="/contact" class="footer-links">Contact us</a>
                    <a href="/terms" class="footer-links">Terms of service</a>
                    <a href="/privacy" class="footer-links">Privacy policy</a>
                    <a href="/support" class="footer-links">NetroHost support</a>
                    <a href="/bug-report" class="footer-links">Report a bug</a>
                </div>
            </div>
        </div>

        <div class="flex flex-row justify-between">
            <img src="/logo-black.svg" alt="netro logo" class="justify-center" />
            <a href="https://untone.org/blog/2026-02-22_netro" class="font-display footer-links flex gap-3 self-end text-2xl"
                >Design assistance by <img src="/untone.svg" alt="untone logo" /></a
            >
        </div>
    </div>
    <div class="flex w-full flex-row items-center justify-between bg-black px-16.5 py-4.5">
        <ul class="flex flex-row items-center gap-6">
            <li>
                <a href="https://discord.gg/HdKeWtV">
                    <SiDiscord class="text-3xl" />
                </a>
            </li>
            <li>
                <a href="https://youtube.com/@NetroCorp">
                    <SiYoutube class="text-3xl" />
                </a>
            </li>
            <li>
                <a href="https://bsky.app/profile/netrocorp.net">
                    <SiBluesky class="text-3xl" />
                </a>
            </li>
            <li>
                <a href="https://github.com/NetroCorp">
                    <SiGithub class="text-3xl" />
                </a>
            </li>
        </ul>
        <div class="text-lg">
            <span class="mr-6">v2026.03.3</span>
            <span>
                Made with
                <span class="heart text-error inline-block">&#10084;</span>
                in Texas.
            </span>
        </div>
    </div>
</footer>

<style scoped>
    a.footer-links {
        color: #9ca3af;
        &:hover {
            color: #e5e7eb;
        }
    }

    a:hover {
        color: lightgray;
    }

    .heart {
        animation: pulse 2s ease infinite;
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 1;
            transform: scale(1);
        }

        50% {
            opacity: 0.727;
            transform: scale(1.2);
        }
    }
</style>
