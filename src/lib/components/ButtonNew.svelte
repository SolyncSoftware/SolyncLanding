<script lang="ts">
    let { class: className = '', href = '#', text = '', children, ...rest } = $props();
</script>

<a
    {href}
    class={`bg-offaccent group button outline-accent relative
        flex flex-col items-start self-end
        rounded-3xl py-3.5 pr-12 pl-5 text-xl font-normal
        text-white shadow-xl/6 transition-all
        ease-in-out hover:cursor-pointer hover:bg-black hover:outline-2
        ${className}`}
    {...rest}
>
    {@render children()}
    <img
        src="images/circle-icon.svg"
        class="absolute top-1/2 right-0 translate-x-4 -translate-y-1/2 transition-transform duration-200"
        alt="circle icon"
    />
</a>
