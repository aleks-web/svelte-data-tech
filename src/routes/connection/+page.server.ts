import type { Actions } from './$types';
import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';

export const load: PageServerLoad = async (event) => {

	const sitesResult = await db.query.sites.findMany({ with: { chats: true } });

	console.log(sitesResult);

	return { sites: sitesResult };
};

export const actions: Actions = {

};