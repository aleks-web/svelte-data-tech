import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async (event) => {
	const sitesResult = await db.query.sites.findMany({limit: 1, offset: 0, with: { chats: true }});

	return { sites: sitesResult };
};

export const actions: Actions = {

};