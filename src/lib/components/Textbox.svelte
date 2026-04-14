<script>
    let input = $state('world');
</script>

<div class="flex flex-col gap-4 text-xl">
    <label for="fname">{input}</label>
    <input
        class="focus:ring-accent border-l-accent border-accent/50 border border-l-4 bg-black/30 px-5 py-4 font-sans focus:ring-2 focus:outline-none"
        type="text"
        id="fname"
        name="fname"
        value={input}
    />
</div>
