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
			.values([
				{ domain: 'data.local' },
				{ domain: 'test' },
				{ domain: 'test.local' },
				{ domain: 'test2.local' },
				{ domain: 'test3.local' },
				{ domain: 'test4.local' },
				{ domain: 'test5.local' },
				{ domain: 'test6.local' },
				{ domain: 'test7.local' },
				{ domain: 'test8.local' },
				{ domain: 'test9.local' },
				{ domain: 'test10.local' },
				{ domain: 'test11.local' },
				{ domain: 'test12.local' },
				{ domain: 'test13.local' },
				{ domain: 'test14.local' },
				{ domain: 'test15.local' },
				{ domain: 'test16.local' },
				{ domain: 'test17.local' },
				{ domain: 'test18.local' },
				{ domain: 'test19.local' },
				{ domain: 'test20.local' }
			])
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