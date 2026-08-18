import type { LayoutServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { resolve } from '$app/paths';
export const load: LayoutServerLoad = async (event) => {
	const isAuthRoute = event.route.id?.startsWith('/auth');

	if (!event.locals.user && !isAuthRoute) {
		redirect(302, resolve('/auth?in'));
	}

	return {
		user: event.locals.user,
		sidebarCollapsed: event.cookies.get('sidebar-collapsed') === 'true'
	};
};
