import {
	bigint,
	boolean,
	integer,
	jsonb,
	text,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core"
import { authSchema, createdAtAttribute, timestampAttributes } from "../helpers"
import { users } from "./core"

const pgTable = authSchema.table

// One row per user. Stores the argon2id password hash and brute-force lockout state.
export const passwords = pgTable("passwords", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" })
		.unique(),
	hash: text("hash").notNull(), // argon2id hash — never store plaintext
	passwordChangedAt: timestamp("password_changed_at", { withTimezone: true }),
	resetRequiredAt: timestamp("reset_required_at", { withTimezone: true }),
	failedAttempts: integer("failed_attempts").notNull().default(0),
	// Lock account until this timestamp after consecutive failed attempts
	lockedUntil: timestamp("locked_until", { withTimezone: true }),
	...createdAtAttribute,
})

// One row per connected OAuth provider account. A user may link multiple providers.
export const socialOauthAccounts = pgTable(
	"social_oauth_accounts",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		provider: text("provider").notNull(),
		providerSubject: text("provider_subject").notNull(), // stable sub/ID from provider — never use email as identifier
		emailAtProvider: text("email_at_provider"), // informational only, may change over time
		accessTokenEncrypted: text("access_token_encrypted"), // AES-GCM encrypted at rest
		refreshTokenEncrypted: text("refresh_token_encrypted"), // AES-GCM encrypted at rest
		tokenExpiresAt: timestamp("token_expires_at", { withTimezone: true }),
		...timestampAttributes,
	},
	// A provider account can be linked to exactly one user
	(t) => [
		unique("social_oauth_accounts_provider_provider_subject_key").on(
			t.provider,
			t.providerSubject,
		),
	],
)

// WebAuthn / Passkey (FIDO2)
export const passkeys = pgTable("passkeys", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	credentialId: text("credential_id").notNull().unique(),
	publicKey: text("public_key").notNull(), // COSE-encoded public key, base64url
	// Authenticator counter. Must strictly increase on each use; regression = credential cloned.
	signCount: bigint("sign_count", { mode: "number" }).default(0),
	transports: jsonb("transports"), // e.g. ["internal", "usb", "nfc"]
	aaguid: text("aaguid"), // authenticator model ID, lookup in FIDO MDS for attestation
	backedUp: boolean("backed_up").default(false), // true = synced to cloud keychain
	deviceName: text("device_name"), // user-provided label, e.g. "iPhone 16"
	lastUsedAt: timestamp("last_used_at", { withTimezone: true }),
	...createdAtAttribute,
})
