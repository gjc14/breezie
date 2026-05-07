import { pgSchema, timestamp } from "drizzle-orm/pg-core"

export const papaSchema = pgSchema("papa")
export const authSchema = pgSchema("auth")

export const timestampAttribute = {
	timestamp: timestamp({ withTimezone: true }).notNull().defaultNow(),
}

export const createdAtAttribute = {
	createdAt: timestamp("created_at", { withTimezone: true })
		.notNull()
		.defaultNow(),
}

export const updatedAtAttribute = {
	updatedAt: timestamp("updated_at", { withTimezone: true })
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
}

export const deletedAtAttribute = {
	deletedAt: timestamp("deleted_at", { withTimezone: true }),
}

export const timestampAttributes = {
	...createdAtAttribute,
	...updatedAtAttribute,
}
