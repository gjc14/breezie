import { text, timestamp, uuid } from "drizzle-orm/pg-core"
import { authSchema } from "../helpers"
import { users } from "./core"

const pgTable = authSchema.table

// Short-lived single-use tokens for email verification, password reset, and magic links.
export const verificationTokens = pgTable("verification_tokens", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: uuid("user_id").references(() => users.id, { onDelete: "cascade" }),
	// SHA-256 hash. Plaintext is sent to the user exactly once (via email) and never stored.
	tokenHash: text("token_hash").notNull().unique(),
	type: text("type").notNull(), // 'email_verify' | 'password_reset' | 'magic_link'
	expiresAt: timestamp("expires_at").notNull(),
	usedAt: timestamp("used_at"), // null = unused; set on first use to prevent reuse
})
