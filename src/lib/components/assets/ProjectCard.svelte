<script>
    import ButtonSimple from '../ButtonSimple.svelte';

    import rs from 'rune-scroller';

    let { project } = $props();
</script>

<div
    class="z-1 flex min-h-118 rounded-4xl bg-white p-2 text-white shadow-xl/4 transition"
    use:rs={{
        animation: 'fade-up',
        duration: 800,
        repeat: false,
        delay: 0,
        offset: 0
    }}
>
    <div class="relative flex w-full flex-col justify-end gap-2 overflow-hidden rounded-3xl p-5 text-lg">
        <enhanced:img
            src={project.imageSrc}
            alt={project.title}
            class="absolute inset-0 -z-1 h-full w-full object-cover"
            loading="lazy"
            decoding="async"
        />
        <div class="absolute inset-0 -z-1 bg-linear-to-b from-transparent to-black"></div>

        <h3 class="text-accent text-3xl font-bold tracking-wide">{project.title}</h3>
        <p>{project.desc}</p>

        <div class="flex gap-3">
            {#if project.page !== '#'}
                <ButtonSimple text="Case Study" href={project.page} class="self-start text-lg! hover:text-white" />
            {/if}
            {#if project.website !== '#'}
                <ButtonSimple text="Website" href={project.website} target="_blank" class="self-start text-lg! hover:text-white" />
            {/if}
            {#if project.github !== '#'}
                <ButtonSimple text="GitHub" href={project.github} target="_blank" class="self-start text-lg! hover:text-white" />
            {/if}
        </div>
    </div>
</div>
