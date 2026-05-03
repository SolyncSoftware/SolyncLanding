<script>
    import { SiBluesky, SiDiscord, SiGithub, SiYoutube } from '@icons-pack/svelte-simple-icons';
    import Waves from '../assets/Waves.svelte';
    import NetroLogo from '../NetroLogo.svelte';
</script>

<footer class="border-accent relative overflow-hidden border-t-8">
    <div
        class="pointer-events-none absolute inset-0 z-0 opacity-40"
        style="background-image: radial-gradient(circle, rgb(0 0 0) 0%, rgba(0, 0, 0, 0) 67%);"
    ></div>

    <div class="col-start-1 row-start-1 h-full w-full">
        <Waves
            style="position: absolute; top: 0; left: 0; width: 100vw; height: 100vh; z-index: -1; background-image: url(/images/static-footer.jpg);"
            wavesType="/netro_footer.json"
        />
    </div>
    <!-- the actual footer -->
    <div class="col-start-1 row-start-1 flex flex-row justify-between gap-7 px-16 py-9 text-xl font-bold text-white/70">
        <!-- logo with text and love -->
        <div>
            <a href="/">
                <NetroLogo class="hover:fill-accent mb-8 fill-white transition-colors duration-300 ease-in-out" width="540" height="118" />
            </a>
            <div class="border-accent border-l-4 pl-6">
                <p class="max-w-[42ch]">
                    Home of the future. We're a small software collective creating user-first experiences. We collaborate to create what's
                    next.
                </p>
                <br />
                <span class="mb-4 block">
                    Made with
                    <span class="heart text-error inline-block">&#10084;</span>
                    in Texas.
                </span>
                <span class="text-xs tracking-[24%] text-white/40"
                    >&copy; 2022-2026 NETRO LLC // Design assistance by <a
                        href="https://untone.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="text-white/40 underline hover:text-white">UNTONE</a
                    >.</span
                >
            </div>
        </div>
        <div class="flex flex-col justify-between">
            <div class="flex flex-row gap-14">
                <div class="flex flex-col gap-4">
                    <span class="bg-accent font-display w-fit py-2 pr-2 pl-4 text-right font-semibold text-black">NETRO</span>
                    <span class="flex flex-col gap-4 border-l-2 border-white/10 pl-4">
                        <a href="/about" class="footer-links">About Us</a>
                        <a href="/apply" class="footer-links">Work at Netro</a>
                        <!-- <a href="/partnerships" class="footer-links">Partnerships</a> -->
                        <a href="/contact" class="footer-links">Contact us</a>
                    </span>
                </div>
                <div class="flex flex-col gap-4">
                    <span class="bg-accent font-display w-fit py-2 pr-2 pl-4 text-right font-semibold text-black">SERVICES</span>
                    <span class="flex flex-col gap-4 border-l-2 border-white/10 pl-4">
                        <a href="https://netro.host/" target="_blank" class="footer-links">NetroHost</a>
                        <a href="https://theaceae.org/" target="_blank" class="footer-links">Theaceae Collective</a>
                        <!-- <a href="https://gardens.wiki" target="_blank" class="footer-links">Gardens Wiki</a> -->
                        <a href="https://my.netro.works/" class="footer-links">myNetro</a>
                    </span>
                </div>
                <div class="flex flex-col gap-4">
                    <span class="bg-accent font-display w-fit py-2 pr-2 pl-4 text-right font-semibold text-black">MORE</span>
                    <span class="flex flex-col gap-4 border-l-2 border-white/10 pl-4">
                        <a href="/legal/privacy" class="footer-links">Privacy Policy</a>
                        <a href="/legal/terms" class="footer-links">Terms of Service</a>
                        <a href="/legal/netrohost/terms" class="footer-links">NetroHost Terms</a>
                        <a href="https://github.com/sponsors/NetroSoftware" target="_blank" rel="noopener noreferrer" class="footer-links">
                            GitHub Sponsors
                        </a>
                    </span>
                </div>
            </div>

            <div>
                <ul class="flex flex-row items-center justify-end gap-4 text-white">
                    <li class="border-accent border-2 bg-black p-3 transition hover:border-white">
                        <a href="https://discord.gg/HdKeWtV">
                            <SiDiscord />
                        </a>
                    </li>
                    <li class="border-accent border-2 bg-black p-3 transition hover:border-white">
                        <a href="https://youtube.com/@NetroCorp">
                            <SiYoutube />
                        </a>
                    </li>
                    <li class="border-accent border-2 bg-black p-3 transition hover:border-white">
                        <a href="https://bsky.app/profile/netrocorp.net">
                            <SiBluesky />
                        </a>
                    </li>
                    <li class="border-accent border-2 bg-black p-3 transition hover:border-white">
                        <a href="https://github.com/NetroSoftware">
                            <SiGithub />
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</footer>

<style scoped>
    a.footer-links {
        &:hover {
            color: #e5e7eb;
        }
    }

    a:hover {
        color: #bbbbbb;
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
