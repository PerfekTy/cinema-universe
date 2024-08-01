import { text, timestamp, pgTable, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id"),
  name: text("name").notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  providerId: text("provider_id"),
  role: text("role").$type<"admin" | "user">().default("user"),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});
