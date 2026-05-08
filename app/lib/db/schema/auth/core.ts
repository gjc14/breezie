import { sql } from "drizzle-orm"
import {
	boolean,
	index,
	jsonb,
	pgEnum,
	text,
	timestamp,
	unique,
	uniqueIndex,
	uuid,
} from "drizzle-orm/pg-core"
import { authSchema, createdAtAttribute, timestampAttributes } from "../helpers"

const pgTable = authSchema.table

export const organizationsStatusEnum = pgEnum("organizations_status", [
	"active",
	"suspended",
	"archived",
])

export const usersStatusEnum = pgEnum("users_status", [
	"active",
	"suspended",
	"archived",
	"pending",
])

export const organizationMembershipsStatusEnum = pgEnum(
	"organization_memberships_status",
	["active", "invited", "suspended", "removed"],
)

export const teamsStatusEnum = pgEnum("teams_status", ["active", "archived"])

export const teamMembersStatusEnum = pgEnum("team_members_status", [
	"active",
	"suspended",
])

export const sessionsAuthMethodEnum = pgEnum("sessions_auth_method", [
	"password",
	"oauth",
	"passkey",
	"saml",
	"oidc",
])

// Tenant boundary. SSO, SCIM, and audit all scope to organization.
export const organizations = pgTable("organizations", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name").notNull(),
	slug: text("slug").notNull().unique(),
	logoUrl: text("logo_url"),
	status: organizationsStatusEnum("status").default("active"),
	...timestampAttributes,
})

export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom(),
	name: text("name"),
	avatarUrl: text("avatar_url"),
	status: usersStatusEnum("status").default("active"),
	...timestampAttributes,
})

export const userEmails = pgTable(
	"user_emails",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		email: text("email").notNull().unique(),
		isPrimary: boolean("is_primary").default(false),
		isVerified: boolean("is_verified").default(false),
		verifiedAt: timestamp("verified_at", { withTimezone: true }),
		...timestampAttributes,
	},
	(t) => [
		// Enforce at most one primary email per user while allowing many non-primary emails.
		uniqueIndex("user_emails_one_primary_idx")
			.on(t.userId)
			.where(sql`${t.isPrimary} = true`),
	],
)

// A user may belong to multiple organizations. Role and status are managed at this layer.
export const organizationMemberships = pgTable(
	"organization_memberships",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizations.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		role: text("role").notNull().default("member"),
		status: organizationMembershipsStatusEnum("status")
			.notNull()
			.default("active"),
		joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow(),
		invitedBy: uuid("invited_by").references(() => users.id),
	},
	// One membership record per (organization, user) pair
	(t) => [
		unique("organization_memberships_organization_id_user_id_key").on(
			t.organizationId,
			t.userId,
		),
	],
)

export const teams = pgTable(
	"teams",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizations.id, { onDelete: "cascade" }),
		slug: text("slug").notNull(),
		name: text("name").notNull(),
		status: teamsStatusEnum("status").default("active"),
		...timestampAttributes,
	},
	// slug is unique within an organization
	(t) => [
		unique("teams_organization_id_slug_key").on(t.organizationId, t.slug),
	],
)

// Team members are linked via membership (not directly via user) to enforce org-scoped access.
export const teamMembers = pgTable(
	"team_members",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		teamId: uuid("team_id")
			.notNull()
			.references(() => teams.id, { onDelete: "cascade" }),
		membershipId: uuid("membership_id")
			.notNull()
			.references(() => organizationMemberships.id, { onDelete: "cascade" }),
		role: text("role").default("member"),
		status: teamMembersStatusEnum("status").default("active"),
		...createdAtAttribute,
	},
	(t) => [
		unique("team_members_team_id_membership_id_key").on(
			t.teamId,
			t.membershipId,
		),
	],
)

export const sessions = pgTable(
	"sessions",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		organizationId: uuid("organization_id").references(() => organizations.id, {
			onDelete: "set null",
		}),
		organizationMembershipId: uuid("organization_membership_id").references(
			() => organizationMemberships.id,
			{ onDelete: "set null" },
		),
		// SHA-256 hash of the opaque token. Plaintext returned to client exactly once, never stored.
		tokenHash: text("token_hash").notNull().unique(),
		// 'password' | 'oauth' | 'passkey' | 'saml' | 'oidc'
		authMethod: sessionsAuthMethodEnum("auth_method")
			.notNull()
			.default("password"),
		// OIDC Authentication Methods Reference / Authentication Context Class Reference.
		// Populated for step-up authorization decisions in downstream middleware.
		amr: jsonb("amr"),
		acr: text("acr"),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		// Upgraded to true after the MFA challenge passes. Auth middleware checks this flag.
		mfaVerified: boolean("mfa_verified").default(false),
		// Soft-revoke enables forced logout of all devices while preserving the audit trail.
		revokedAt: timestamp("revoked_at", { withTimezone: true }),
		expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
		...createdAtAttribute,
	},
	// Optimized for the most common query: active sessions for a given user
	(t) => [
		index("sessions_user_expires_idx").on(t.userId, t.expiresAt),
		index("sessions_organization_expires_idx").on(
			t.organizationId,
			t.expiresAt,
		),
		index("sessions_membership_revoked_idx").on(
			t.organizationMembershipId,
			t.revokedAt,
		),
		index("sessions_expires_idx").on(t.expiresAt),
	],
)
