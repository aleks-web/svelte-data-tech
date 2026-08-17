<script lang="ts">
    import type { Snippet } from 'svelte';
    import { AngleRightOutline, AngleLeftOutline } from "flowbite-svelte-icons";

    let {
        children,
        collapsed = $bindable(false)
    }: {
        children?: Snippet<[collapsed: boolean]>;
        collapsed?: boolean;
    } = $props();

    function toggleSidebar() {
        collapsed = !collapsed;

        const secure = window.location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `sidebar-collapsed=${collapsed}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
    }

    let linkClass = `
        group-[.collapsed]/sidebar:bg-blue-50 group-[.collapsed]/sidebar:border-blue-50 group-[.collapsed]/sidebar:text-blue-300
        group-[.collapsed]/sidebar:hover:bg-blue-100 group-[.collapsed]/sidebar:hover:text-blue-400
        flex justify-center cursor-pointer
        bg-blue-50 flex text-blue-400 p-2 rounded-xl transition-all
        hover:bg-blue-100
    `;
</script>

<aside
    class={collapsed
        ? 'group/sidebar collapsed relative flex w-[72px] min-w-[72px] max-w-[72px] flex-col gap-2 overflow-hidden rounded-2xl bg-white p-2 transition-[width,max-width,padding] duration-200'
        : 'group/sidebar relative flex w-full max-w-[250px] flex-col gap-2 overflow-hidden rounded-2xl bg-white p-4 transition-[width,max-width,padding] duration-200 md:max-w-[200px] lg:max-w-[250px] xl:max-w-[300px]'}
>
    <button
        type="button"
        onclick={toggleSidebar}
        aria-label={collapsed ? 'Развернуть боковую панель' : 'Свернуть боковую панель'}
        title={collapsed ? 'Развернуть' : 'Свернуть'}
        class={linkClass}
    >
        {#if collapsed}
            <AngleRightOutline class="h-5 w-5" />
        {:else}
            <AngleLeftOutline class="h-5 w-5" />
        {/if}
    </button>
    {@render children?.(collapsed)}
</aside>
