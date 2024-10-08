import { Trash2 } from 'lucide-react'

import { Separator } from '~/components/ui/separator'
import { RemoveFromCart } from '../../_web.store/components/cart-fn'
import { Product, useStore } from '../../_web.store/hooks/cart'
import { formatCurrency } from '../../_web.store/lib/utils'
import { NumberInput } from './number-input'

const CartItemCard = ({ product }: { product: Product }) => {
    const { setItem, cart } = useStore()
    const item = cart.find(item => item.id === product.id)

    return (
        <li className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
                <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-12 h-12 border rounded-md object-cover"
                />

                {/* Item detail */}
                <div className="flex flex-col">
                    <p className="flex items-baseline gap-2 font-bold">
                        {product.title}
                    </p>
                    <div className="h-5 flex items-center gap-2 text-sm">
                        <div>Cat/Tag</div>
                        <Separator
                            orientation="vertical"
                            className="bg-primary h-3/4"
                        />
                        <div>Some desc</div>
                    </div>
                </div>
            </div>

            <p className="font-bold">
                {formatCurrency.format(product.price * (item?.quantity || 0))}
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
        </li>
    )
}

export default CartItemCard
