import {
	boolean,
	jsonb,
	text,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core"
import { authSchema, createdAtAttribute, timestampAttributes } from "../helpers"
import { organizationMemberships, organizations, users } from "./core"

const pgTable = authSchema.table

// Bearer tokens issued to IdP for SCIM API access. Only the SHA-256 hash is stored.
export const scimTokens = pgTable("scim_tokens", {
	id: uuid("id").primaryKey().defaultRandom(),
	organizationId: uuid("organization_id")
		.notNull()
		.references(() => organizations.id, { onDelete: "cascade" }),
	tokenHash: text("token_hash").notNull().unique(),
	scope: text("scope"),
	description: text("description"),
	expiresAt: timestamp("expires_at", { withTimezone: true }),
	rotatedAt: timestamp("rotated_at", { withTimezone: true }),
	...createdAtAttribute,
})

export const scimIdentities = pgTable(
	"scim_identities",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizations.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		externalId: text("external_id").notNull(),
		// Set to false on deprovision (PATCH active:false). Never hard-delete — preserves audit trail.
		active: boolean("active").notNull().default(true),
		rawPayload: jsonb("raw_payload"),
		lastSyncAt: timestamp("last_sync_at", { withTimezone: true }),
		...timestampAttributes,
	},
	// externalId is unique within an organization (different orgs may have the same IdP external ID)
	(t) => [
		unique("scim_identities_organization_id_external_id_key").on(
			t.organizationId,
			t.externalId,
		),
	],
)

export const scimGroups = pgTable(
	"scim_groups",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizations.id, { onDelete: "cascade" }),
		externalId: text("external_id").notNull(),
		displayName: text("display_name").notNull(),
		lastSyncAt: timestamp("last_sync_at", { withTimezone: true }),
		...timestampAttributes,
	},
	(t) => [
		unique("scim_groups_organization_id_external_id_key").on(
			t.organizationId,
			t.externalId,
		),
	],
)

export const scimGroupMemberships = pgTable(
	"scim_group_memberships",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		scimGroupId: uuid("scim_group_id")
			.notNull()
			.references(() => scimGroups.id, { onDelete: "cascade" }),
		organizationMembershipId: uuid("organization_membership_id")
			.notNull()
			.references(() => organizationMemberships.id, { onDelete: "cascade" }),
		...createdAtAttribute,
	},
	// A membership cannot be added to the same SCIM group twice
	(t) => [
		unique(
			"scim_group_memberships_scim_group_id_organization_membership_id_key",
		).on(t.scimGroupId, t.organizationMembershipId),
	],
)
