import { Link } from '@remix-run/react'
import { QuestionMarkIcon } from '@radix-ui/react-icons'

import { Button } from '~/components/ui/button'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '~/components/ui/hover-card'
import { cn } from '~/lib/utils'
import { useStore } from '../../hooks/cart'
import { calculateDiscount, formatCurrency } from '../../lib/utils'

export const CartSummary = ({ className }: { className?: string }) => {
    const { priceCount } = useStore()
    const { discountAmount } = calculateDiscount()

    const total = priceCount - discountAmount

    return (
        <div
            className={cn(
                'flex flex-wrap flex-col items-start justify-center gap-6 p-5 border',
                className
            )}
        >
            <h3>Cart Summary</h3>

            <div className="w-full space-y-6">
                <div className="w-full">
                    <CartAccounts />

                    <dl className="flex items-center justify-between gap-3 py-3 mt-5 border-t border-t-primary">
                        <dt className="text-sm font-bold text-primary">
                            Total
                        </dt>
                        <dd className="text-sm font-bold text-primary">
                            {formatCurrency.format(total)}
                        </dd>
                    </dl>

                    <Link to="/checkout">
                        <Button className="w-full py-3 mt-5">
                            Proceed to checkout
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export const CartAccounts = () => {
    const { priceCount, discount, cart } = useStore()
    const { discountPercentage, discountPrice, target, discountAmount } =
        calculateDiscount()

    const total = priceCount - discountAmount

    return (
        <div className="divide-y divide-muted">
            <dl className="flex items-center justify-between gap-3 py-3">
                <dt className="text-sm font-normal text-primary">Subtotal</dt>
                <dd className="text-sm font-medium text-primary">
                    {formatCurrency.format(priceCount)}
                </dd>
            </dl>

            <dl className="flex items-center justify-between gap-3 py-3">
                <dt className="text-sm font-normal text-primary">
                    <HoverCard>
                        <HoverCardTrigger className="flex hover:underline underline-offset-4 cursor-pointer">
                            Savings
                            <QuestionMarkIcon className="w-2.5 h-2.5" />
                        </HoverCardTrigger>
                        <HoverCardContent>
                            Your savings are calculated based on{' '}
                            {/* On percentage discount */}
                            {discountPercentage && (
                                <>
                                    {discountPercentage}% OFF{' '}
                                    <span>
                                        {target.totalAmount
                                            ? 'total amount'
                                            : target.products.length +
                                              ' selected products'}
                                    </span>
                                </>
                            )}
                            {/* On fixed price discount */}
                            {discountPrice && (
                                <>
                                    {formatCurrency.format(discountPrice)} OFF{' '}
                                    <span>
                                        {target.totalAmount
                                            ? 'total amount'
                                            : target.products.length +
                                              ' selected products'}
                                    </span>
                                </>
                            )}
                        </HoverCardContent>
                    </HoverCard>
                </dt>
                <dd className="text-sm font-medium text-green-600 dark:text-green-500">
                    {formatCurrency.format(discountAmount)}
                </dd>
            </dl>

            <dl className="flex items-center justify-between gap-3 py-3">
                <dt className="text-sm font-normal text-primary">
                    Tax (included)
                </dt>
                <dd className="text-sm font-medium text-primary">
                    {formatCurrency.format(total - total / 1.05)}
                </dd>
            </dl>
        </div>
    )
}
