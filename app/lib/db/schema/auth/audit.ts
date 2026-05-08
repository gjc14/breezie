import { sql } from "drizzle-orm"
import { check, index, integer, jsonb, text, uuid } from "drizzle-orm/pg-core"
import { authSchema, createdAtAttribute } from "../helpers"
import { organizations, sessions, users } from "./core"

const pgTable = authSchema.table

// Append-only security event log. Never update or delete rows.
export const auditLogs = pgTable(
	"audit_logs",
	{
		id: uuid("id").primaryKey().defaultRandom(),
		userId: uuid("user_id").references(() => users.id),
		organizationId: uuid("organization_id").references(() => organizations.id),
		// Nullable: session may be purged after retention period
		sessionId: uuid("session_id").references(() => sessions.id, {
			onDelete: "set null",
		}),
		// e.g. 'user.login' | 'user.login_failed' | 'mfa.enrolled' | 'session.revoked' | 'scim.user_deprovisioned'
		eventType: text("event_type").notNull(),
		// Risk signal 0–100. Can be enriched by a risk engine post-insertion.
		riskScore: integer("risk_score").default(0),
		resourceType: text("resource_type"),
		resourceId: uuid("resource_id"),
		metadata: jsonb("metadata"),
		ipAddress: text("ip_address"),
		userAgent: text("user_agent"),
		...createdAtAttribute,
	},
	// Most common query: all events for an organization, ordered by time
	(t) => [
		// Expect dot-notation events like 'user.login' or 'mfa.enrolled'.
		check(
			"audit_logs_event_type_format_check",
			sql`${t.eventType} ~ '^[a-z0-9]+\.[a-z0-9_]+$'`,
		),
		index("audit_logs_org_created_at_idx").on(t.organizationId, t.createdAt),
	],
)
