<script lang="ts">
    import Button from '#lib/components/Button.svelte';
    import SolyncLogo from '#lib/components/SolyncLogo.svelte';
    import PageContainer from '#lib/components/assets/PageContainer.svelte';
    import NavigationArrow from '#lib/components/assets/NavigationArrow.svelte';
    import PostCarousel from '#lib/components/blog/PostCarousel.svelte';
    import OurProjects from '#lib/components/index/OurProjects.svelte';
    import OurTeam from '#lib/components/index/OurTeam.svelte';
    import { stores as waveStores } from '#lib/stores/persistentWave.js';
    import { SiDiscord, SiGithub } from '@icons-pack/svelte-simple-icons';
    import { Mail } from '@lucide/svelte';
    import rs from 'rune-scroller';
    import type { PageProps } from './$types.ts';

    // let blogArticles = $state<Article[]>([]);
    // let loading = $state(true);

    // onMount(async () => {
    //     const res = await fetch('/api/articles?type=blog'),
    //         articles: Article[] = await res.json();
    //     blogArticles = articles.slice(0, 2);
    //     loading = false;
    // });
    const { data }: PageProps = $props();
</script>

<section class="flex flex-col gap-30">
    <div
        class="relative text-white shadow-2xl/20"
        use:rs={{
            animation: 'fade-up',
            duration: 1000,
            repeat: false
        }}
    >
        <PageContainer
            className=""
            innerClass="text-accent [&_p]:text-2xl bg-[linear-gradient(to_right,#fff_0%,rgba(255,255,255,0)_100%)] md:bg-[linear-gradient(to_right,#fff_0%,rgba(255,255,255,0)_70%)]"
            wavesStyle=""
            showDim={false}
            waveStore={waveStores.homepageCubes}
        >
            <img
                src="/images/home-logo.svg"
                alt="home logo"
                aria-hidden="true"
                class="pointer-events-none absolute -z-1 -m-9 object-cover"
            />

            <div class="xl:text-accent left-0 mt-70 max-w-160 text-black">
                <h1 class="text-5xl md:text-7xl">Building what comes next, <span class="font-extrabold">together</span>.</h1>
                <p class="mt-4 font-medium">
                    We're an independent software collective creating user-first experiences. Not just because we love it, but because it's
                    ethical. We collaborate to create what's next.
                </p>
            </div>

            <div class="mt-4 flex flex-row flex-wrap items-center gap-2">
                <Button
                    class="bg-accent! hover:bg-accent! w-fit self-center! px-8 text-xl! font-medium text-white! shadow-none
                   transition-all hover:-translate-y-1 hover:shadow-[0_5px_0px_#00000022]"
                    href="/about"
                >
                    Learn more
                </Button>
                <Button
                    class="bg-accent! hover:bg-accent! w-fit self-center! px-8 text-xl! font-medium text-white! shadow-none
                   transition-all hover:-translate-y-1 hover:shadow-[0_5px_0px_#00000022]"
                    href="/services"
                >
                    Our Services
                </Button>
                <a
                    href="https://discord.gg/nUeRyRtDYC"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-offwhite/20 border-accent rounded-full border p-3.5 transition-all hover:-translate-y-1 hover:shadow-[0_5px_0px_#00000022]"
                >
                    <SiDiscord />
                </a>
                <a
                    href="https://github.com/SolyncSoftware"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="bg-offwhite/20 border-accent rounded-full border p-3.5 transition-all hover:-translate-y-1 hover:shadow-[0_5px_0px_#00000022]"
                >
                    <SiGithub />
                </a>
                <a
                    href="/contact"
                    class="bg-offwhite/20 border-accent rounded-full border p-3.5 transition-all hover:-translate-y-1 hover:shadow-[0_5px_0px_#00000022]"
                >
                    <Mail />
                </a>
            </div>
        </PageContainer>
    </div>

    <div class="space-y-10">
        <div class="flex flex-col items-center justify-between text-center 2xl:flex-row 2xl:text-right">
            <h2 class="text-accent text-[180px] leading-40 font-black 2xl:leading-14">Our work</h2>
            <p class="text-center text-xl font-medium 2xl:max-w-100 2xl:text-right">
                We collaboratively build tools that spark our curiosity and address human needs, with a user-first approach.
            </p>
        </div>

        <OurProjects projects={data.projects} />
        <div class="flex w-full flex-col items-end">
            <Button href="/about#our-work" class="text-accent! w-fit self-center! bg-white font-bold">
                see more of our projects
                <img
                    src="/images/arrow-sorange2.svg"
                    alt="Arrow"
                    class="overflow-hidden transition-transform duration-200 group-hover:translate-x-2"
                    loading="lazy"
                />
            </Button>
        </div>
    </div>

    <div class="space-y-10">
        <h2 class="text-accent text-center text-9xl font-black lg:leading-14">Meet the team</h2>

        <p class="text-center text-xl font-medium">
            The people who made all this possible. Interested? <a href="/apply" class="text-accent hover:underline">Join us</a>, and help
            build what's next, together.
        </p>
        <OurTeam members={data.members} />
    </div>

    <div class="space-y-4">
        <h2 class="text-accent text-center text-9xl font-black lg:leading-14">What we're up to</h2>
        <PostCarousel posts={data.blogArticles} />

        <div class="flex w-full flex-col pt-16">
            <Button href="/blog" class="text-accent! w-fit self-center! bg-white font-bold">
                read more at our blog
                <img
                    src="/images/arrow-sorange2.svg"
                    alt="Arrow"
                    class="overflow-hidden transition-transform duration-200 group-hover:translate-x-2"
                    loading="lazy"
                />
            </Button>
        </div>
    </div>

    <!-- may remove this or make it a component. so far its only in the about page -->
    <div class="flex w-full flex-col items-center justify-center gap-4 text-center text-6xl text-[#444444]">
        <p class="font-light">Building what comes next, <span class="font-black">together.</span></p>
        <SolyncLogo iconOnly={true} class="fill-accent w-50" />
    </div>
</section>
