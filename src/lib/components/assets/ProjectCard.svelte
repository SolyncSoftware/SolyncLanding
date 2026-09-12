<script>
    import ButtonSimple from '../ButtonSimple.svelte';

    import rs from 'rune-scroller';

    let { project } = $props();
</script>

<a href={(project.page !== "#") ? project.page :
    (project.website !== "#") ? project.website :
    (project.github !== "#") ? project.github : ""}>
    <div
        class="project__card z-1 flex min-h-118 rounded-3xl bg-white p-1 text-white transition cardshadow-large"
        use:rs={{
            animation: 'fade-up',
            duration: 800,
            repeat: false,
            delay: 0,
            offset: 0
        }}
    >
        <div class="relative flex w-full flex-col justify-end gap-2 overflow-hidden rounded-[20px] p-6 text-lg">
            <enhanced:img
                src={project.imageSrc}
                alt={project.title}
                class="absolute inset-0 -z-1 h-full w-full object-cover"
                loading="lazy"
                decoding="async"
            />
            <div class="absolute inset-0 -z-1 bg-linear-to-b from-transparent to-[#000000]"></div>
                <div class="">
                    <h3 class="text-2xl font-bold leading-[1.25em]">{project.title}</h3>
                    <p class="text-xl font-book leading-[1.25em]">{project.desc}</p>
                </div>
                <!-- <div class="flex gap-3">
                    {#if project.page !== '#'}
                        <ButtonSimple text="Case Study" href={project.page} class="self-start text-lg! hover:text-white" />
                    {/if}
                    {#if project.website !== '#'}
                        <ButtonSimple text="Website" href={project.website} target="_blank" class="self-start text-lg! hover:text-white" />
                    {/if}
                    {#if project.github !== '#'}
                        <ButtonSimple text="GitHub" href={project.github} target="_blank" class="self-start text-lg! hover:text-white" />
                    {/if}
                </div> -->
            </div>
    </div>
</a>
