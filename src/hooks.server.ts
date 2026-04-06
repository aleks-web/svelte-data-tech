import type { Handle } from '@sveltejs/kit';
import { building } from '$app/environment';
import { auth } from '$lib/server/auth';
import { svelteKitHandler } from 'better-auth/svelte-kit';
import { sequence } from '@sveltejs/kit/hooks';
import { db } from '$lib/server/db';

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

	}

	return resolve(event);
};

export const handle: Handle = sequence(handleBetterAuth, handleDbCreator);