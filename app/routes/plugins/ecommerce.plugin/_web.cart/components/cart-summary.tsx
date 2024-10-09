import { QuestionMarkIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'

import { Button } from '~/components/ui/button'
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '~/components/ui/hover-card'
import { cn } from '~/lib/utils'
import { useStore } from '../../hooks/cart'
import {
    calculateDiscountSaving,
    calculateSaleSaving,
    formatCurrency,
} from '../../lib/utils'

export const CartSummary = ({ className }: { className?: string }) => {
    const { priceCount } = useStore()
    const { discountAmount } = calculateDiscountSaving()

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
    const { priceCount } = useStore()
    const { discountPercentage, discountPrice, target, discountAmount } =
        calculateDiscountSaving()
    const saleDiscount = calculateSaleSaving()

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
                    {/* There are two ways of savings, applying discount or the product is on sale */}
                    <HoverCard>
                        <HoverCardTrigger className="flex hover:underline underline-offset-4 cursor-pointer">
                            Savings
                            <QuestionMarkIcon className="w-2.5 h-2.5" />
                        </HoverCardTrigger>
                        <HoverCardContent className="w-72">
                            {!discountPercentage &&
                            !discountPrice &&
                            !saleDiscount ? (
                                'There are no savings, apply your code now!'
                            ) : (
                                <ul className="list-disc list-inside">
                                    Your savings are calculated based on:
                                    {/* On percentage discount */}
                                    {discountPercentage && (
                                        <li className="text-sm">
                                            {`${discountPercentage} % OFF `}
                                            <strong>
                                                {target.totalAmount
                                                    ? ' by promo code on total amount'
                                                    : ' by promo code on selected products'}
                                            </strong>
                                        </li>
                                    )}
                                    {/* On fixed price discount */}
                                    {discountPrice && (
                                        <li className="text-sm">
                                            {`${formatCurrency.format(
                                                discountPrice
                                            )} OFF `}
                                            <strong>
                                                {target.totalAmount
                                                    ? ' by promo code on total amount'
                                                    : ' by promo code on selected products'}
                                            </strong>
                                        </li>
                                    )}
                                    {/* Saving on product sale */}
                                    {saleDiscount && (
                                        <li className="text-sm">
                                            {`${formatCurrency.format(
                                                saleDiscount
                                            )} OFF `}
                                            <strong>products on sale</strong>
                                        </li>
                                    )}
                                </ul>
                            )}
                        </HoverCardContent>
                    </HoverCard>
                </dt>
                <dd className="text-sm font-medium text-green-600 dark:text-green-500">
                    {formatCurrency.format(discountAmount + saleDiscount)}
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
