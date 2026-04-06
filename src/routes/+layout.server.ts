import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user && event.route.id != '/auth') {
		redirect(302, resolve('/auth?in'));
	}

	return {
		user: event.locals.user
	};
};