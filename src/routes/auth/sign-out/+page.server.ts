import type { PageServerLoad } from './$types';
import { auth } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';

export const load: PageServerLoad = async (event) => {
	await auth.api.signOut({ headers: event.request.headers });
	redirect(302, resolve('/auth?in'));
};