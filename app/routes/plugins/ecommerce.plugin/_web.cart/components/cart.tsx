import { Separator } from '~/components/ui/separator'
import { cn } from '~/lib/utils'
import { useStore } from '../../_web.store/hooks/cart'
import { formatCurrency } from '../../_web.store/lib/utils'
import CartItemCard from './cart-item-card'

export const Cart = ({
    className,
    storeRoute,
}: {
    className?: string
    storeRoute: string
}) => {
    const { priceCount, cart } = useStore()

    return (
        <section className={cn('border p-5 flex flex-col gap-6', className)}>
            <h3>Cart</h3>

            <div>
                {cart.length === 0 ? (
                    <p>Enpty Cart</p>
                ) : (
                    <ul className="flex flex-col">
                        {cart.map((item, index) => (
                            <>
                                <CartItemCard
                                    key={item.id}
                                    product={item}
                                    storeRoute={storeRoute}
                                />
                                {index < cart.length - 1 && (
                                    <Separator className="my-3" />
                                )}
                            </>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex flex-col px-1 py-3 gap-1.5 border-t">
                <p className="flex justify-between items-center text-sm font-bold text-primary">
                    <span>Total</span>
                    <span>{formatCurrency.format(priceCount)}</span>
                </p>
            </div>
        </section>
    )
}
