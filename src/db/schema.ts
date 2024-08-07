import { text, pgTable, uuid, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom(),
  name: varchar("name").notNull(),
  email: varchar("email").notNull(),
  password: varchar("password").notNull(),
  providerId: text("provider_id"),
  role: text("role").$type<"admin" | "user">().default("user"),
  image: text("image"),
});

export type User = typeof users.$inferSelect;
