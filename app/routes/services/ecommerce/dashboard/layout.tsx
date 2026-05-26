import type { Route } from "./+types/layout"
import { Outlet } from "react-router"

export default function ECLayout(_: Route.ComponentProps) {
	return <Outlet />
}
