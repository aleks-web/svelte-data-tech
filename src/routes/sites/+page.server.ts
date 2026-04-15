import type { Actions } from './$types';
import type { PageServerLoad } from './$types';

import { eq } from 'drizzle-orm';
import { db } from '$lib/server/db';
import { sites } from '$lib/server/db/schema';

export const load: PageServerLoad = async (event) => {
	const sitesResult = await db.query.sites.findMany({
		limit: 10,
		offset: 0,
		with: { chats: true }
	});

	return { sites: sitesResult };
};

export const actions: Actions = {
	removeSiteByDomain: async (event) => {
		const formData = await event.request.formData();
		const domain = formData.get('domain')?.toString() ?? '';
		await db.delete(sites).where(eq(sites.domain, domain));
	}
};