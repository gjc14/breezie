import { Trash2 } from 'lucide-react'

import { Separator } from '~/components/ui/separator'
import { RemoveFromCart } from '../../_web.store/components/cart-fn'
import { Product, useStore } from '../../_web.store/hooks/cart'
import { formatCurrency } from '../../_web.store/lib/utils'
import { NumberInput } from './number-input'

const CartItemCard = ({
    product,
    storeRoute,
}: {
    product: Product
    storeRoute: string
}) => {
    const { setItem, cart } = useStore()
    const item = cart.find(item => item.id === product.id)

    return (
        <li className="space-y-3">
            <div className="w-full flex items-center gap-2 sm:gap-3">
                <a href={`${storeRoute}/${product.slug}`}>
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="w-12 h-12 border rounded-md object-cover"
                    />
                </a>

                {/* Item detail */}
                <div className="flex flex-col">
                    <a
                        href={`${storeRoute}/${product.slug}`}
                        className="flex items-baseline gap-2 font-bold underline-offset-4 hover:underline"
                    >
                        {product.title}
                    </a>
                    <div className="h-5 flex items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                        {product.category && <div>{product.category}</div>}

                        {product.tag && (
                            <>
                                <Separator
                                    orientation="vertical"
                                    className="bg-primary h-3/4"
                                />
                                <div>{product.tag}</div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="w-full flex flex-row flex-wrap items-center justify-between gap-3 sm:ml-auto md:gap-6">
                <p className="font-bold">
                    {formatCurrency.format(
                        product.price * (item?.quantity || 0)
                    )}
                </p>

                {/* Actions */}
                <div className="w-full flex items-center justify-between gap-1 sm:ml-auto sm:w-fit">
                    {/* Set item by quantity */}
                    <NumberInput
                        value={item?.quantity || 0}
                        onChange={v => {
                            setItem(product, v)
                        }}
                    />

                    <RemoveFromCart product={product} removeAll>
                        <div className="cursor-pointer p-1.5 rounded hover:bg-muted">
                            <Trash2 size={16} />
                        </div>
                    </RemoveFromCart>
                </div>
            </div>
        </li>
    )
}

export default CartItemCard
