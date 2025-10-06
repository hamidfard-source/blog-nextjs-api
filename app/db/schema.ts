import { relations } from "drizzle-orm";
import { integer, pgEnum, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum('rolesEnum', ['owner', 'admin', 'user'])

export const usersTable = pgTable("users", {
  id: uuid('id').defaultRandom().primaryKey(),
  username: varchar({ length: 16 }).notNull().unique(),
  password: varchar('password').notNull(),
  role: rolesEnum('role').default('user').notNull(),
  createdAt: timestamp({ mode: 'date' }).defaultNow().notNull(),
  updateAt: timestamp('update_at', { mode: 'date' }).defaultNow().notNull(),
});
export type usersType = typeof usersTable.$inferSelect;

export const postTable = pgTable("posts", {
  id: uuid('id').defaultRandom().primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  authorId: uuid('author_id').references(() => usersTable.id).notNull(),
  content: text('content').notNull(),
  imageUrl: varchar("image_url", { length: 512 }), // URL or file path for the image
  categoryId: integer('category_id').references(() => categoryTable.id),
  createdAt: timestamp({ mode: 'date' }).defaultNow(),
  updateAt: timestamp('update_at', { mode: 'date' }).defaultNow().notNull(),
});

export type postsType = typeof postTable.$inferSelect;

export const categoryTable = pgTable('categories', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export type categoryType = typeof categoryTable.$inferSelect;

export const comments = pgTable("comments", {
  id: serial('id').primaryKey(),
  content: text('content').notNull(),
  postId: uuid('post_id').references(() => postTable.id),
  userId: uuid('user_id').references(() => usersTable.id),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
export type commentsType = typeof comments.$inferSelect;

export const userRelations = relations(usersTable, ({ many }) => ({
  posts: many(postTable),
  comments: many(comments),
}));

export const postsRelations = relations(postTable, ({ one, many }) => ({
  author: one(usersTable, {
    fields: [postTable.authorId],
    references: [usersTable.id],
  }),
  comments: many(comments),
  categoryTable: many(categoryTable, { relationName: 'postCategories' }),
}))

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(postTable, {
    fields: [comments.postId],
    references: [postTable.id],
  }),
  user: one(usersTable, {
    fields: [comments.userId],
    references: [usersTable.id]
  })
}));

export const categoryRelations = relations(categoryTable, ({ many }) => ({
  posts: many(postTable),
}));

export async function up(db: any) {
  // Create the users table
  await db.schema.createTable('users', usersTable);
}

export async function down(db: any) {
  // Drop the users table
  await db.schema.dropTable('users');
}