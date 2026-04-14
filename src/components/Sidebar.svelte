<script lang="ts">
    const { children }: { children?: () => any } = $props();
</script>

<aside
    class="group flex flex-col gap-2 min-h-(--content-height) w-full rounded-2xl bg-white p-4 max-w-[250px]
        md:max-w-[200px]
        lg:max-w-[250px]
        xl:max-w-[300px]
    "
>
    {@render children?.()}
</aside>
