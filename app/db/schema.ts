import { integer, pgEnum, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum('rolesEnum',['owner','admin','user'])

export const usersTable = pgTable("users", {
  id: serial('id').primaryKey(),
  username: varchar({ length: 16 }).notNull().unique(),
  password: varchar('password').notNull(),
  role: rolesEnum('role').default('user'),
  createdAt: timestamp({mode:'date'}).defaultNow().notNull(),
  updateAt: timestamp('update_at',{mode:'date'}).defaultNow().notNull(),
});
export type usersType = typeof usersTable.$inferSelect;

export const postTable = pgTable("posts",{
  id: serial('id').primaryKey(),
  author :  integer('author_id').references(()=>usersTable.id).notNull(),
  content : text('content').notNull(),
  imageUrl: varchar("image_url", { length: 512 }), // URL or file path for the image
  categoryId: integer('category_id').references(()=>categoryTable.id) ,
  createdAt: timestamp({mode:'date'}).defaultNow(),
  updateAt: timestamp('update_at',{mode:'date'}).defaultNow().notNull(),
});

export type postsType = typeof postTable.$inferSelect;

export const categoryTable = pgTable('categories',{
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


export async function up(db: any) {
  // Create the users table
  await db.schema.createTable('users', usersTable);
}

export async function down(db: any) {
  // Drop the users table
  await db.schema.dropTable('users');
}