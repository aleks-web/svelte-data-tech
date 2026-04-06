import { db } from './index';
import { sites } from './schema';

await db
	.insert(sites)
	.values([{ domain: 'data.local' }])
	.$returningId();