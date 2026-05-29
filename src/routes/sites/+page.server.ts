import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

import { eq } from 'drizzle-orm';
import { count } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { sites } from '$lib/server/db/schema';
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

	const [{ total }] = await db.select({ total: count() }).from(sites);
	const sitesResult = await db.query.sites.findMany({
		limit: pageSize,
		offset: offset,
		with: { chats: true }
	});

	if (!sitesResult.length && currentPage != 1) {
		return redirect(301, resolve('/sites'));
	}

	return {
		sites: sitesResult,
		currentPage,
		pageSize,
		offset,
		total
	};
};

export const actions: Actions = {
	removeSiteByDomain: async (event) => {
		const formData = await event.request.formData();
		const domain = formData.get('domain')?.toString() ?? '';
		await db.delete(sites).where(eq(sites.domain, domain));
	}
};