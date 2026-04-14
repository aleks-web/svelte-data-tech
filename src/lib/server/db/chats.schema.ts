import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';

export const sites = mysqlTable('sites', {
	domain: varchar('domain', { length: 30 }).primaryKey(),
	createdAt: timestamp('created_at').defaultNow().notNull()
});

export const chats = mysqlTable('chats', {
	chatId: varchar('chat_id', { length: 200 }).primaryKey(),
	name: varchar('name', { length: 250 })
});

export const chatsSites = mysqlTable('chats_sites', {
	chatId: varchar('chat_id', { length: 200 })
		.notNull()
		.references(() => chats.chatId),
	domain: varchar('domain', { length: 30 })
		.notNull()
		.references(() => sites.domain)
});

export const sitesRelations = relations(sites, ({ many }) => ({
	chats: many(chatsSites)
}));

export const chatsRelations = relations(chats, ({ many }) => ({
	sites: many(chatsSites)
}));

export const chatsSitesRelations = relations(chatsSites, ({ one }) => ({
	chats: one(chats, {
		fields: [chatsSites.chatId],
		references: [chats.chatId]
	}),
	sites: one(sites, {
		fields: [chatsSites.domain],
		references: [sites.domain]
	})
}));