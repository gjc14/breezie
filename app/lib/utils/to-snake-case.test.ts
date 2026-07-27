import { describe, expect, it } from "vitest"
import { toSnakeCase } from "./to-snake-case"

describe("toSnakeCase", () => {
	it("converts camelCase to snake_case", () => {
		expect(toSnakeCase("helloWorld")).toBe("hello_world")
		expect(toSnakeCase("userName")).toBe("user_name")
		expect(toSnakeCase("user1Name")).toBe("user1_name")
	})

	it("converts PascalCase to snake_case", () => {
		expect(toSnakeCase("HelloWorld")).toBe("hello_world")
		expect(toSnakeCase("UserProfile")).toBe("user_profile")
	})

	it("handles acronyms correctly", () => {
		expect(toSnakeCase("HTTPServer")).toBe("http_server")
		expect(toSnakeCase("XMLParser")).toBe("xml_parser")
		expect(toSnakeCase("userIDNumber")).toBe("user_id_number")
		expect(toSnakeCase("JSONAPIResponse")).toBe("jsonapi_response")
	})

	it("handles numbers", () => {
		expect(toSnakeCase("user123Name")).toBe("user123_name")
		expect(toSnakeCase("Version2API")).toBe("version2_api")
	})

	it("replaces non-alphanumeric characters with underscore", () => {
		expect(toSnakeCase("hello world")).toBe("hello_world")
		expect(toSnakeCase("hello-world")).toBe("hello_world")
		expect(toSnakeCase("hello.world/test")).toBe("hello_world_test")
		expect(toSnakeCase("hello@world#test")).toBe("hello_world_test")
	})

	it("supports unicode characters", () => {
		expect(toSnakeCase("臺灣ABC123")).toBe("臺灣abc123")
		expect(toSnakeCase("日本語Test")).toBe("日本語test")
		expect(toSnakeCase("こんにちは World")).toBe("こんにちは_world")
	})

	it("removes duplicated underscores", () => {
		expect(toSnakeCase("hello___world")).toBe("hello_world")
		expect(toSnakeCase("hello - world")).toBe("hello_world")
		expect(toSnakeCase("foo__bar___baz")).toBe("foo_bar_baz")
	})

	it("removes leading and trailing underscores", () => {
		expect(toSnakeCase("__helloWorld__")).toBe("hello_world")
		expect(toSnakeCase("___hello___")).toBe("hello")
	})

	it("handles empty or invalid input", () => {
		expect(toSnakeCase("")).toBe("")
		expect(toSnakeCase("___")).toBe("")
		expect(toSnakeCase("---")).toBe("")
		expect(toSnakeCase("@@@")).toBe("")
		expect(toSnakeCase("###")).toBe("")
		expect(toSnakeCase("...")).toBe("")
	})
})
