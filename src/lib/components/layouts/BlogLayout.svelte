<script>
    export let title;
    export let author;
    export let date;
    export let categories;
    export let image;
</script>

<!-- <h1 class="text-5xl font-bold uppercase">{title}</h1>
<div class="border-t-accent mt-6 h-auto w-301 border-t-11 bg-black p-8">
    <span class="font-sans text-2xl">
        <p class="text-accent">Written/Revised on {date}</p>

        <p class="text-accent">By {author}</p>
        <p class="text-accent">Categories: {categories.join(', ')}</p>
        <img src={image || '/images/fallback.png'} alt="screenshot of news post" class="h-56 w-full object-cover" />
        <div class="markdown">
            <slot></slot>
        </div>
    </span>
</div> -->

<article>
    <img src={image || '/images/fallback.png'} alt="screenshot of news post" class="mb-16 h-94 w-full object-cover" />

    <div class="flex gap-8">
        <!-- todo: probably need to add a max-width -->
        <div class="markdown flex-2 font-sans text-2xl">
            <h1 class="font-display text-5xl font-bold uppercase">{title}</h1>
            <slot></slot>
        </div>
        <div class="flex-1">
            <p class="bg-accent mb-11 w-fit py-4 pr-10 pl-5 text-3xl font-bold text-black uppercase">{categories[0]}</p>

            <div class="border-accent flex flex-col border-l-6 pl-9">
                <!-- todo: profile pic from gh. possible endpoint -->
                <img src="/images/avatarplaceholder.svg" alt="Profile" class="mb-3 h-46 w-46" />
                <span class="text-3xl font-bold">RealName</span>
                <span class="font-sans text-3xl leading-7">@{author}</span>
                <span class="mt-8 font-sans text-2xl font-bold">{date}</span>
            </div>
        </div>
    </div>

    <!-- todo: read more section. grab latest articles -->
</article>
