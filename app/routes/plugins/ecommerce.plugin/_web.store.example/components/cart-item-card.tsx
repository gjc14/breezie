import { AddToCart, RemoveFromCart } from '../../_web.store/components/cart-fn'
import { Product, useStore } from '../../_web.store/components/hooks/cart'
import { NumberInput } from '../../_web.store/components/number-input'

const CartItemCard = ({ product }: { product: Product }) => {
    const { setItem, cart } = useStore()
    const item = cart.find(item => item.id === product.id)

    return (
        <li className="flex items-center gap-1">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-12 h-12 rounded-md object-fit"
            />
            <p>{product.title}</p>

            {/* Set item by quantity */}
            <NumberInput
                value={item?.quantity || 0}
                onChange={v => {
                    setItem(product, v)
                }}
            />

            {/* Item incremental */}
            <AddToCart product={product} />
            <RemoveFromCart product={product} />

            <RemoveFromCart product={product} removeAll>
                <button className="px-2 py-1 rounded border transition-colors hover:border-primary">
                    Remove all {product.id}
                </button>
            </RemoveFromCart>
        </li>
    )
}

export default CartItemCard
