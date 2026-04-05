"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comments = exports.tickets = exports.users = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.varchar)('name', { length: 255 }).notNull(),
    email: (0, pg_core_1.varchar)('email', { length: 255 }).notNull().unique(),
});
exports.tickets = (0, pg_core_1.pgTable)('tickets', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    title: (0, pg_core_1.varchar)('title', { length: 255 }).notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    status: (0, pg_core_1.varchar)('status', { enum: ['open', 'in_progress', 'closed'] }).default('open').notNull(),
    priority: (0, pg_core_1.varchar)('priority', { enum: ['low', 'medium', 'high'] }).default('low').notNull(),
    assignedToUserId: (0, pg_core_1.integer)('assigned_to_user_id').references(() => exports.users.id),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at').defaultNow().notNull(),
});
exports.comments = (0, pg_core_1.pgTable)('comments', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    ticketId: (0, pg_core_1.integer)('ticket_id').references(() => exports.tickets.id).notNull(),
    message: (0, pg_core_1.text)('message').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at').defaultNow().notNull(),
});
