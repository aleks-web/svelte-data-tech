<script lang="ts">
	import type { PageProps } from './$types';
	import type { ActionResult } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';
	import { deserialize } from '$app/forms';
	import { twMerge } from 'tailwind-merge';
	import IconDateTime from "$components/other/IconDateTime.svelte";
	import Pagination from "$components/ui/Pagination.svelte";

	let { data }: PageProps = $props();

	const trCl = "group/tr transition-all bg-blue-50 h-[55px]";
	const dtCl = "px-4 border-b border-b-blue-100 border-x border-blue-100 transition-colors first:border-l-0 last:border-r-0 group-hover/tr:bg-blue-100 group-hover/tr:border-blue-200 group-[.last]/tr:border-b-0";
	const dtControl = twMerge(dtCl, 'justify-center items-center');

	async function removeSiteByDomain(domain: string) {
		const formData = new FormData();
		formData.append('domain', domain);

		const response = await fetch('?/removeSiteByDomain', {
			method: 'POST',
			body: formData,
			headers: { 'x-sveltekit-action': 'true' }
		});
		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
		}
	}
</script>

<svelte:head>
	<title>Список сайтов</title>
</svelte:head>

<div class="mx-4 mt-4 mb-2">
	<h2 class="font-bold text-[20px] md:text-[25px] xl:text-[30px]">Сайты</h2>
</div>

<Pagination count={data.sites.length} perPage={1} defaultPage={1} onPageChange={(state) => { return state.next; }} />

<div class="h-full mx-4 mb-4 overflow-auto overflow-x-hidden rounded-xl bg-blue-50">
		<table class="w-full">
			<thead class="sticky top-0 w-full shadow-sm">
				<tr class={ twMerge(trCl, 'text-blue-800 font-bold') }>
					<td class="px-4 w-full">Сайт</td>
					<td class="px-4 text-center min-w-[230px]">Количество чатов</td>
					<td class="px-4 min-w-[230px]">Дата создания</td>
					<td></td>
				</tr>
			</thead>

			<tbody style="background: #ccc">
				{@render getFullSites()}
			</tbody>
		</table>
</div>


{#snippet getSites()}
	{#each data.sites as site, i (site.domain)}
		<tr class={ trCl } class:last={data.sites.length === i + 1}>
			<td class={ dtCl }>
				<div class="flex items-center gap-2">
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="w-5 h-5 cursor-pointer transition-colors text-blue-300 hover:text-blue-500" viewBox="0 0 16 16">
						<path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
						<path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
					</svg>
					<a class="flex gap-1 items-center text-blue-800 hover:text-blue-600" href="https://{site.domain}">
						<span>{site.domain}</span>
						<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-3" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
							<path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
						</svg>
					</a>
				</div>
			</td>
			<td class={ twMerge(dtCl, 'text-center') }>{ site.chats.length }</td>
			<td class={ dtCl }>
				<IconDateTime date={site.createdAt} />
			</td>
			<td class={ dtControl }>
				<button aria-label="Удалить" type="button" class="flex items-center justify-center" onclick={ () => removeSiteByDomain(site.domain) }>
					<svg class="cursor-pointer transition-all hover:text-red-500" xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 32 32">
						<path fill="currentColor" d="M17.414 16L26 7.414L24.586 6L16 14.586L7.414 6L6 7.414L14.586 16L6 24.586L7.414 26L16 17.414L24.586 26L26 24.586z"/>
					</svg>
				</button>
			</td>
		</tr>
	{/each}
{/snippet}

{#snippet getFullSites()}
	{@render getSites()}
{/snippet}