import { useState } from 'react'

import { AddToCart } from '../../_web.store/components/cart-fn'
import { Product } from '../../_web.store/components/hooks/cart'
import { NumberInput } from '../../_web.store/components/number-input'

const ProductItemCard = ({ product }: { product: Product }) => {
    const [inputQty, setInputQty] = useState(1)

    return (
        <li key={product.id} className="flex items-center gap-1">
            <img
                src={product.thumbnail}
                alt={product.title}
                className="w-12 h-12 rounded-md object-fit"
            />
            <p>{product.title}</p>

            <NumberInput
                value={inputQty}
                onChange={v => {
                    setInputQty(v)
                }}
            />

            <AddToCart product={product} byQuantity={inputQty}>
                <button className="px-2 py-1 rounded border transition-colors hover:border-primary">
                    Add to Cart
                </button>
            </AddToCart>
        </li>
    )
}

export default ProductItemCard
