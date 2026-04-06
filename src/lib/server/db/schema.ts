import { mysqlTable, timestamp, varchar, primaryKey } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const sites = mysqlTable('sites', {
	domain: varchar('domain', { length: 30 }).primaryKey(),
	createdAt: timestamp('created_at').defaultNow()
});

export const chats = mysqlTable('chats', {
	chatId: varchar('chat_id', { length: 200 }).primaryKey(),
	name: varchar('name', { length: 250 })
});

export const chatsSites = mysqlTable(
	'chats_sites',
	{
		chatId: varchar('chat_id', { length: 200 }).references(() => chats.chatId),
		domain: varchar('domain', { length: 30 }).references(() => sites.domain)
	},
	// (t) => [primaryKey({ columns: [t.chatId, t.domain] })]
);

export const sitesRelations = relations(sites, ({ many }) => ({
	chats: many(chats, { relationName: 'chats' })
}));

export const chatsRelations = relations(chats, ({ many }) => ({
	sites: many(sites, { relationName: 'sites' })
}));

export const chatsSitesRelations = relations(chatsSites, ({ one }) => ({
	chat: one(chats, {
		fields: [chatsSites.chatId],
		references: [chats.chatId],
		relationName: 'chats'
	}),
	site: one(sites, {
		fields: [chatsSites.domain],
		references: [sites.domain],
		relationName: 'sites'
	})
}));

export * from './auth.schema';