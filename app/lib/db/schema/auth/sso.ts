import {
	boolean,
	jsonb,
	pgEnum,
	text,
	timestamp,
	unique,
	uuid,
} from "drizzle-orm/pg-core"
import { authSchema, createdAtAttribute, timestampAttributes } from "../helpers"
import { organizations, users } from "./core"

const pgTable = authSchema.table

export const ssoConnectionsStatusEnum = pgEnum("sso_connections_status", [
	"active",
	"disabled",
])

export const ssoConnectionsProviderTypeEnum = pgEnum(
	"sso_connections_provider_type",
	["saml", "oidc"],
)

export const ssoConnectionsMfaPolicyEnum = pgEnum(
	"sso_connections_mfa_policy",
	[
		"inherit", // follow org-level MFA policy
		"required", // require MFA for all users logging in via this connection
		"none", // disable MFA for users logging in via this connection
	],
)

// Top-level SSO configuration per organization. Each org can have at most one SAML and one OIDC connection.
export const ssoConnections = pgTable(
	"sso_connections",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		organizationId: uuid("organization_id")
			.notNull()
			.references(() => organizations.id, { onDelete: "cascade" }),
		providerType: ssoConnectionsProviderTypeEnum("provider_type").notNull(), // 'saml' | 'oidc'
		status: ssoConnectionsStatusEnum("status").notNull().default("active"),
		domainHint: text("domain_hint"),
		jitEnabled: boolean("jit_enabled").default(false),
		mfaPolicy: ssoConnectionsMfaPolicyEnum("mfa_policy"),
		...timestampAttributes,
	},
	// One connection per provider type per organization
	(t) => [
		unique("sso_connections_organization_id_provider_type_key").on(
			t.organizationId,
			t.providerType,
		),
	],
)

export const ssoSamlConfigs = pgTable("sso_saml_configs", {
	id: uuid("id").primaryKey().defaultRandom(),
	connectionId: uuid("connection_id")
		.notNull()
		.references(() => ssoConnections.id, { onDelete: "cascade" })
		.unique(),
	idpEntityId: text("idp_entity_id").notNull(),
	idpSsoUrl: text("idp_sso_url").notNull(),
	idpCertificate: text("idp_certificate").notNull(), // X.509 PEM for signature verification
	spEntityId: text("sp_entity_id").notNull(), // your app's entity ID in this connection
	// Maps IdP attribute names to your schema fields
	// e.g. {"email": "mail", "name": "displayName"}
	attributeMapping: jsonb("attribute_mapping"),
	active: boolean("active").default(true),
})

// One-to-one with sso_connections. Stores OIDC issuer, client credentials, and claim mapping.
export const ssoOidcConfigs = pgTable("sso_oidc_configs", {
	id: uuid("id").primaryKey().defaultRandom(),
	connectionId: uuid("connection_id")
		.notNull()
		.references(() => ssoConnections.id, { onDelete: "cascade" })
		.unique(),
	issuerUrl: text("issuer_url").notNull(), // used to fetch /.well-known/openid-configuration
	clientId: text("client_id").notNull(),
	clientSecretEncrypted: text("client_secret_encrypted").notNull(), // AES-GCM encrypted at rest
	scopes: text("scopes").default("openid email profile"),
	// Maps OIDC claims to your schema fields, e.g. {"email": "email", "name": "preferred_username"}
	claimMapping: jsonb("claim_mapping"),
	active: boolean("active").default(true),
})

// Links an SSO login (connection + IdP subject) to a local user. The join record for account linking.
export const ssoIdentities = pgTable(
	"sso_identities",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		connectionId: uuid("connection_id")
			.notNull()
			.references(() => ssoConnections.id, { onDelete: "cascade" }),
		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		// Stable identifier from the IdP (NameID in SAML, sub claim in OIDC). Immutable.
		subject: text("subject").notNull(),
		emailClaim: text("email_claim"), // informational; may change over time at the IdP
		lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
		...createdAtAttribute,
	},
	// A subject within a connection maps to exactly one user
	(t) => [
		unique("sso_identities_connection_id_subject_key").on(
			t.connectionId,
			t.subject,
		),
	],
)

// Verified email domains for an organization. Used to auto-route users to the correct SSO connection.
export const ssoOrganizationDomains = pgTable("sso_organization_domains", {
	id: uuid("id").primaryKey().defaultRandom(),
	organizationId: uuid("organization_id")
		.notNull()
		.references(() => organizations.id, { onDelete: "cascade" }),
	// Globally unique: a domain can only belong to one organization
	domain: text("domain").notNull().unique(),
	verifiedAt: timestamp("verified_at", { withTimezone: true }),
	...createdAtAttribute,
})
