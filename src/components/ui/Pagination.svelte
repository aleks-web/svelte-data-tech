<script lang="ts">
    import { createPagination, melt } from '@melt-ui/svelte';
    import { twMerge } from "tailwind-merge";

    let { class: className, count, perPage, defaultPage, onPageChange = (s) => s.next }: { class?: string, count: number, perPage: number, defaultPage: number, onPageChange?: (state: { curr: number, next: number }) => number } = $props();

    const btn = `
		flex items-center justify-center h-8 w-8 aspect-1 rounded-md border-1 border-blue-800 text-blue-800 text-sm transition-colors cursor-pointer
		hover:opacity-75
		disabled:pointer-events-none disabled:opacity-40
		data-[selected]:bg-blue-900 data-[selected]:border-blue-900 data-[selected]:text-white
	`;

    const {
        elements: { root, pageTrigger, prevButton, nextButton },
        states: { pages, range, page },
    } = createPagination({
        count: count,
        perPage: perPage,
        defaultPage: defaultPage,
        siblingCount: 1,
        onPageChange: onPageChange
    });
</script>

<nav class={twMerge(className, "flex flex-col items-center gap-4")} aria-label="pagination" use:melt={$root}>

    <div class="flex items-center gap-2">
        <button class={twMerge(btn, 'bg-blue-900 text-white')} use:melt={$prevButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
            </svg>
        </button>

        {#each $pages as page (page.key)}
            {#if page.type === 'ellipsis'}
                <span>...</span>
            {:else}
                <button class={btn} use:melt={$pageTrigger(page)}>{page.value}</button>
            {/if}
        {/each}
        <button class={btn} use:melt={$nextButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
            </svg>
        </button>
    </div>
</nav>