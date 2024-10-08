import { Link } from '@remix-run/react'

import { Button } from '~/components/ui/button'
import { Separator } from '~/components/ui/separator'
import { useStore } from '../../_web.store/hooks/cart'
import { formatCurrency } from '../../_web.store/lib/utils'
import CartItemCard from './cart-item-card'
import { cn } from '~/lib/utils'

export const Cart = ({ className }: { className?: string }) => {
    const { priceCount, cart } = useStore()

    return (
        <div className={cn('border p-5 flex flex-col gap-6', className)}>
            <h2>Cart</h2>

            <div>
                {cart.length === 0 ? (
                    <p>Enpty Cart</p>
                ) : (
                    <ul className="flex flex-col gap-5">
                        {cart.map((item, index) => (
                            <>
                                <CartItemCard key={item.id} product={item} />
                                {index < cart.length - 1 && <Separator />}
                            </>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex flex-col px-1 py-3 gap-1.5 border-t">
                <p className="flex justify-between items-center">
                    <span>Total</span>
                    <span>{formatCurrency.format(priceCount)}</span>
                </p>
            </div>

            <Link to="/checkout">
                <Button className="w-full">Proceed to checkout</Button>
            </Link>
        </div>
    )
}
