import type { CellContext } from "@tanstack/react-table"
import { Maximize } from "lucide-react"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "~/components/ui/popover"

export function ReadOnlyCell<TData>({ getValue }: CellContext<TData, unknown>) {
	const initialValue = getValue()
	let displayValue = initialValue as React.ReactNode

	if (typeof initialValue === "object" && initialValue !== null) {
		if (Array.isArray(initialValue)) {
			// refer to ~/hooks/use-stable-key-map
			const seen = new Map<string, number>()

			displayValue = (
				<div className="flex items-center gap-1">
					{initialValue.map((v) => {
						const baseKey = JSON.stringify(v)

						const occurrence = seen.get(baseKey) ?? 0
						seen.set(baseKey, occurrence + 1)

						return <Badge key={`${baseKey}:${occurrence}`}>{String(v)}</Badge>
					})}
				</div>
			)
		} else {
			displayValue = (
				<Popover>
					<PopoverTrigger
						render={
							<Button
								variant={"ghost"}
								size={"icon"}
								className="text-muted-foreground size-6"
							>
								<Maximize className="size-3.5" />
							</Button>
						}
					/>
					<PopoverContent>
						<pre className="text-sm whitespace-pre-wrap">
							{JSON.stringify(initialValue, null, 2)}
						</pre>
					</PopoverContent>
				</Popover>
			)
		}
	}

	return <div className="flex h-12 items-center text-sm">{displayValue}</div>
}
