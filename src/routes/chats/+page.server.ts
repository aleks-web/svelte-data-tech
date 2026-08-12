import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

import { eq } from 'drizzle-orm';
import { count } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { chats } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export const load: PageServerLoad = async (event) => {
	const pageSize = Number(event.url.searchParams.get('page_size'));
	const currentPage = event.url.searchParams.get('page') ? Number(event.url.searchParams.get('page')) : 1;
	const offset = (currentPage - 1) * pageSize;

	if (!pageSize) {
		event.url.searchParams.set('page_size', '5');
		return redirect(301, event.url);
	}

	if (
		(event.url.searchParams.get('page') && event.url.searchParams.get('page') === '1') || event.url.searchParams.get('page') === '') {
		event.url.searchParams.delete('page');
		return redirect(301, event.url);
	}

	const [{ total }] = await db.select({ total: count() }).from(chats);
	const chatsResult = await db.query.chats.findMany({
		limit: pageSize,
		offset: offset
	});

	if (!chatsResult.length && currentPage != 1) {
		return redirect(301, resolve('/chats'));
	}

	return {
		chats: chatsResult,
		currentPage,
		pageSize,
		offset,
		total
	};
};

export const actions: Actions = {
	removeChatByChatId: async (event) => {
		const formData = await event.request.formData();
		const chatId = formData.get('chatId')?.toString() ?? '';
		await db.delete(chats).where(eq(chats.chatId, chatId));
	},
	updateChatName: async (event) => {
		const formData = await event.request.formData();
		const chatId = formData.get('chatId')?.toString() ?? '';
		const name = formData.get('name')?.toString() ?? '';
		await db.update(chats).set({ name }).where(eq(chats.chatId, chatId));
	},
	updateChatId: async (event) => {
		const formData = await event.request.formData();
		const chatId = formData.get('chatId')?.toString() ?? '';
		const newId = formData.get('newId')?.toString() ?? '';
		await db.update(chats).set({ chatId: newId }).where(eq(chats.chatId, chatId));
	}
};