import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { sequence } from '@sveltejs/kit/hooks';
import { db } from '$lib/server/db';
import { sites, chats } from '$lib/server/db/schema';

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

const handleDbCreator: Handle = async ({ event, resolve }) => {
	const sitesResult = await db.query.sites.findMany({ limit: 1, offset: 0, with: { chats: true } });

	if (!sitesResult.length) {
		await db
			.insert(sites)
			.values([{ domain: 'data.local' }, { domain: 'test' }, { domain: 'test.local' }])
			.$returningId();

		// await db
		// 	.insert(chats)
		// 	.values([
		// 		{ chatId: 'chat1', name: 'chatName1' },
		// 		{ chatId: 'chat2', name: 'chatName2' },
		// 		{ chatId: 'chat3', name: 'chatName3' }
		// 	])
		// 	.$returningId();
	}

	return resolve(event);
};

export const handle: Handle = sequence(handleBetterAuth, handleDbCreator);