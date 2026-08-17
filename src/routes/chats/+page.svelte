<script lang="ts">
	import type { PageProps } from './$types';
	import type { ActionResult } from '@sveltejs/kit';
	import { goto, invalidateAll } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { deserialize } from '$app/forms';
	import { browser } from '$app/environment';
	import { twMerge } from 'tailwind-merge';
	import { Pagination, EditLineText } from "$components";

	let { data }: PageProps = $props();

	const trCl = "group/tr transition-all bg-blue-50 h-[55px]";
	const dtCl = "px-4 border-b border-b-blue-100 border-x border-blue-100 transition-colors first:border-l-0 last:border-r-0 group-hover/tr:bg-blue-100 group-hover/tr:border-blue-200 group-[.last]/tr:border-b-0";
	const dtControl = twMerge(dtCl, 'justify-center items-center');

	async function removeChatByChatId(chatId: string) {
		const formData = new FormData();
		formData.append('chatId', chatId);

		const response = await fetch('?/removeChatByChatId', {
			method: 'POST',
			body: formData,
			headers: { 'x-sveltekit-action': 'true' }
		});
		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			if (data.chats.length === 1 && data.currentPage > 1) {
				const previousPage = data.currentPage - 1;
				const pageParam = previousPage > 1 ? `&page=${previousPage}` : '';
				await goto(resolve(`/chats?page_size=${data.pageSize}${pageParam}`), {
					invalidateAll: true
				});
				return;
			}

			await invalidateAll();
		}
	}

	async function updateChatName(chatId: string, name?: string) {
		const formData = new FormData();
		formData.append('chatId', chatId);
		formData.append('name', name ?? '');

		const response = await fetch('?/updateChatName', {
			method: 'POST',
			body: formData,
			headers: { 'x-sveltekit-action': 'true' }
		});
		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
		}
	}

	async function updateChatId(chatId: string, newId?: string) {
		const formData = new FormData();
		formData.append('chatId', chatId);
		formData.append('newId', newId ?? '');

		const response = await fetch('?/updateChatId', {
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
	<title>Список чатов</title>
</svelte:head>

<div class="mx-4 mt-4 mb-2">
	<h2 class="font-bold text-[20px] md:text-[25px] xl:text-[30px]">Чаты</h2>
</div>

<div class="h-full mx-4 mb-4 overflow-auto overflow-x-hidden rounded-xl bg-blue-50">
		<table class="w-full">
			<thead class="sticky top-0 w-full shadow-sm">
				<tr class={ twMerge(trCl, 'text-blue-800 font-bold') }>
					<td class="px-4">id чата</td>
					<td class="px-4 min-w-[230px]">Название</td>
					<td class="max-w-max"></td>
				</tr>
			</thead>

			<tbody style="background: #ccc">
				{@render getFullSites()}
			</tbody>
		</table>
</div>

<div class="mb-6">
	<Pagination
		total={data.total}
		page={data.currentPage}
		size={data.pageSize}
		onPageChange={(state) => {
			if (browser) {
				goto(resolve(`/sites?page=${state.next}&page_size=${data.pageSize}`));
			}
			return state.next;
		}}
	/>
</div>


{#snippet getSites()}
	{#each data.chats as chat, i (chat.chatId)}
		<tr class={ trCl } class:last={data.chats.length === i + 1}>
			<td class={ dtCl }>
				<div class="flex items-center gap-2">
					<EditLineText text={chat.chatId} blurCallback={ async (newId) => await updateChatId(chat.chatId, newId) } maskOptions={{ mask: /^\d+$/ }} />
				</div>
			</td>
			<td class={ dtCl }>
				<EditLineText text={chat.name ?? undefined} blurCallback={ async (name) => await updateChatName(chat.chatId, name) } />
			</td>
			<td class={ dtControl }>
				<button aria-label="Удалить" type="button" class="ml-auto flex items-center justify-center" onclick={ () => removeChatByChatId(chat.chatId) }>
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
