import {
	boolean,
	integer,
	pgEnum,
	text,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core"
import { authSchema, createdAtAttribute, timestampAttributes } from "../helpers"
import { organizations, sessions, users } from "./core"

const pgTable = authSchema.table

export const mfaMethodsTypeEnum = pgEnum("mfa_methods_type", [
	"totp",
	"sms",
	"email",
])

export const mfaChallengesChannelEnum = pgEnum("mfa_challenges_channel", [
	"totp",
	"email",
	"sms",
	"backup_code",
])

// One row per enrolled MFA method per user. A user may enroll multiple methods.
// secret_encrypted must be decrypted at runtime; never store plaintext TOTP secrets.
export const mfaMethods = pgTable(
	"mfa_methods",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: mfaMethodsTypeEnum("type").notNull(), // 'totp' | 'sms' | 'email'
		secretEncrypted: text("secret_encrypted"), // AES-GCM encrypted TOTP base32 secret
		phoneE164: text("phone_e164"), // required when type = 'sms'
		email: text("email"), // required when type = 'email'; may differ from primary
		// verified: user has confirmed the method works (entered a valid code)
		// enabled: method is actively usable for challenges
		// A method must be verified before it can be enabled.
		verified: boolean("verified").default(false),
		enabled: boolean("enabled").default(false),
		...timestampAttributes,
	},
	(t) => [unique("mfa_methods_user_id_type_key").on(t.userId, t.type)],
) // One method of each type per user

// One-time recovery codes. Stored as SHA-256 hashes. Marked used after consumption — never deleted.
export const mfaBackupCodes = pgTable(
	"mfa_backup_codes",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		codeHash: text("code_hash").notNull(),
		used: boolean("used").default(false),
		usedAt: timestamp("used_at", { withTimezone: true }),
		...createdAtAttribute,
	},
	(t) => [
		unique("mfa_backup_codes_user_id_code_hash_key").on(t.userId, t.codeHash),
	],
)

// Tracks each in-flight MFA verification attempt. Enables rate-limiting and replay prevention.
export const mfaChallenges = pgTable("mfa_challenges", {
	id: uuid("id").primaryKey().defaultRandom(),
	userId: uuid("user_id")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	sessionId: uuid("session_id").references(() => sessions.id, {
		onDelete: "set null",
	}),
	methodId: uuid("method_id").references(() => mfaMethods.id, {
		onDelete: "set null",
	}),
	channel: mfaChallengesChannelEnum("channel").notNull(), // 'totp' | 'email' | 'sms' | 'backup_code'
	codeHash: text("code_hash"), // SHA-256 of the OTP; null for TOTP (verified live)
	// Number of failed attempts in this challenge. Used for per-challenge rate limiting.
	attemptCount: integer("attempt_count").default(0),
	expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
	consumedAt: timestamp("consumed_at", { withTimezone: true }), // null = pending or expired
	...createdAtAttribute,
})

// Stores trusted device fingerprints so MFA can be skipped on recognized devices.
export const mfaTrustedDevices = pgTable(
	"mfa_trusted_devices",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		organizationId: uuid("organization_id").references(() => organizations.id, {
			onDelete: "cascade",
		}),
		deviceFingerprintHash: text("device_fingerprint_hash").notNull(),
		expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
		...createdAtAttribute,
	},
	// A device fingerprint must be unique per (user, organization)
	(t) => [
		unique(
			"mfa_trusted_devices_user_id_organization_id_device_fingerprint_hash_key",
		).on(t.userId, t.organizationId, t.deviceFingerprintHash),
	],
)
