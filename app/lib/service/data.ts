import {
	BuildingsIcon,
	CloudIcon,
	LifebuoyIcon,
	PaperPlaneTiltIcon,
	TextAaIcon,
	UserCircleGearIcon,
	UserIcon,
} from "@phosphor-icons/react"
import type { ServiceDashboard } from "~/lib/service/type"

// Default services and navigation items
export const DEFAULT_SERVICE: ServiceDashboard = {
	name: "Papa",
	logo: "/papa-logo-100.png",
	pathname: "/dashboard",
	sidebar: {
		primary: [
			{ icon: UserIcon, title: "Users", pathname: "users" },
			{ icon: CloudIcon, title: "Assets", pathname: "assets" },
			{ icon: TextAaIcon, title: "SEO", pathname: "seo" },
		],
		secondary: [
			{
				title: "Support",
				action: () => {
					alert("Support")
				},
				icon: LifebuoyIcon,
			},
			{
				title: "Feedback",
				action: () => {
					alert("Feedback")
				},
				icon: PaperPlaneTiltIcon,
			},
			{
				title: "Company",
				url: "/dashboard/company",
				icon: BuildingsIcon,
			},
			{
				title: "Admins",
				url: "/dashboard/admins",
				icon: UserCircleGearIcon,
			},
		],
	},
}
