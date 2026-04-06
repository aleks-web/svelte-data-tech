<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
    import { page } from '$app/state';
    import { resolve } from "$app/paths";
    import Header from "$components/Header.svelte";
    import Sidebar from "$components/Sidebar.svelte";
    import { AddressBookOutline } from "flowbite-svelte-icons";

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

{#if page.route.id !== '/auth'}
    <div class="flex min-h-[inherit] flex-col gap-(--gap) overflow-hidden p-(--gap)">
        <Header />

        <div class="flex gap-[inherit]">
            <Sidebar>
                <a
                    class:active={ page.route.id === resolve('/connection') }
                    class="border-2 border-solid border-blue-800 flex min-w-max [.active]:bg-blue-800 [.active]:text-white gap-1 text-blue-800 hover:bg-blue-800 p-3 rounded-xl hover:text-blue-100 transition-all" href="{resolve('/connection')}">
                    <AddressBookOutline class="w-6" />
                    <span>Связь</span>
                </a>
            </Sidebar>

            <div class="flex w-full flex-col bg-white gap-[inherit] overflow-hidden rounded-2xl p-4">
                {@render children()}
            </div>
        </div>
    </div>
{:else}
    {@render children()}
{/if}