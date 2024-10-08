import { useFetcher } from '@remix-run/react'
import { useEffect } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { cn, isConventionalData } from '~/lib/utils'
import { discountSchema, useStore } from '../../_web.store/hooks/cart'

export const CartDiscount = ({ className }: { className?: string }) => {
    const fetcher = useFetcher()
    const { discount, setDiscount } = useStore()

    useEffect(() => {
        if (isConventionalData(fetcher.data)) {
            const { success, error, data } = discountSchema.safeParse(
                fetcher.data.data
            )

            if (!success) {
                console.error('Invalid discount data:', error)
                return
            } else {
                setDiscount(data)
            }
        }
    }, [fetcher.data])

    return (
        <div className={cn('p-5 border space-y-3', className)}>
            <h3>Discount</h3>

            <fetcher.Form
                action="/cart/discount"
                method="POST"
                className="w-full flex items-center justify-between gap-3"
            >
                <Input
                    type="text"
                    name="discount-code"
                    placeholder="Enter your gift card or discount code"
                />
                <Button variant={'outline'}>Apply</Button>
            </fetcher.Form>
        </div>
    )
}
