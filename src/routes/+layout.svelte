<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import type { LayoutProps } from './$types';
    import { page } from '$app/state';
    import { resolve } from "$app/paths";
    import Header from "$components/Header.svelte";
    import Sidebar from "$components/Sidebar.svelte";
    import { MessageDotsSolid, RectangleListSolid, BugSolid } from "flowbite-svelte-icons";

	let { children, data }: LayoutProps = $props();

    let isAuthRoute = $derived(page.route.id?.startsWith('/auth'));

    let linkClass = `
        flex items-center
        border border-solid border-blue-200 flex min-w-max gap-1 text-blue-800 p-3 rounded-xl transition-all
        [.active]:bg-blue-800 [.active]:text-white [.active]:border-blue-800 [.active]:pointer-events-none
        hover:bg-blue-800 hover:text-white hover:border-blue-800
    `;
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if !isAuthRoute}
    <div class="flex min-h-[inherit] flex-col gap-(--gap) overflow-hidden p-(--gap)">
        <Header />

        <div class="flex gap-[inherit]">
            <Sidebar collapsed={data.sidebarCollapsed}>
                {#snippet children(isSidebarCollapsed)}
                <a class:active={ page.route.id === resolve('/sites') }
                        class:justify-center={isSidebarCollapsed}
                        class={linkClass}
                        href="{resolve('/sites')}">
                    <RectangleListSolid class="w-6" />
                    {#if !isSidebarCollapsed}<span>Сайты</span>{/if}
                </a>

                <a class:active={ page.route.id === resolve('/chats') }
                        class:justify-center={isSidebarCollapsed}
                        class={linkClass}
                        href="{resolve('/chats')}">
                    <MessageDotsSolid class="w-6" />
                    {#if !isSidebarCollapsed}<span>Чаты</span>{/if}
                </a>

                <a class:active={ page.route.id === resolve('/test') }
                        class:justify-center={isSidebarCollapsed}
                        class={linkClass}
                        href="{resolve('/test')}">
                    <BugSolid class="w-6" />
                    {#if !isSidebarCollapsed}<span>Test</span>{/if}
                </a>
                {/snippet}
            </Sidebar>

            <div class="flex w-full flex-col bg-white gap-[inherit] overflow-x-hidden overflow-y-auto rounded-2xl h-[var(--content-height)]">
                {@render children()}
            </div>
        </div>
    </div>
{:else}
    <div class="h-full p-(--gap) w-full">
        <div class="flex w-full flex-col bg-white overflow-x-hidden overflow-y-auto rounded-2xl h-full">
            {@render children()}
        </div>
    </div>
{/if}
