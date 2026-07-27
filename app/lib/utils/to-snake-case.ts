export function toSnakeCase(str: string): string {
	return (
		str
			// PascalCase -> Pascal_Case, HTTPServer -> HTTP_Server
			.replace(/([A-Z]+)([A-Z][a-z])/g, "$1_$2")

			// camelCase -> camel_Case, user1Name -> user1_Name
			.replace(/([a-z\d])([A-Z])/g, "$1_$2")

			// supports unicode characters
			.replace(/[^\p{L}\p{N}_]+/gu, "_")

			// removes duplicated underscores
			.replace(/_+/g, "_")

			// removes leading and trailing underscores
			.replace(/^_|_$/g, "")

			.toLowerCase()
	)
}
