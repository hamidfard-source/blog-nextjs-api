CREATE TYPE "public"."rolesEnum" AS ENUM('owner', 'admin', 'user');--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(16) NOT NULL,
	"password" varchar NOT NULL,
	"role" "rolesEnum" DEFAULT 'user',
	"createdAt" timestamp DEFAULT now(),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
