import { pgSchema, timestamp as timestampColumn } from "drizzle-orm/pg-core"

export const papaSchema = pgSchema("papa")
export const authSchema = pgSchema("auth")

export const timestamp = timestampColumn({ withTimezone: true })
	.notNull()
	.defaultNow()

export const createdAt = timestampColumn("created_at", { withTimezone: true })
	.notNull()
	.defaultNow()

export const updatedAt = timestampColumn("updated_at", { withTimezone: true })
	.notNull()
	.defaultNow()
	.$onUpdate(() => new Date())

export const deletedAt = timestampColumn({ withTimezone: true })
