CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"provider_id" text,
	"role" text DEFAULT 'user',
	"created_at" timestamp,
	"updated_at" timestamp
);
