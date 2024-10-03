import { Button } from '~/components/ui/button'
import { Product, useStore } from './hooks/cart'

function AddToCart({ product }: { product: Product }) {
    const { addItem } = useStore()

    return <Button onClick={() => addItem(product)}>Add to cart</Button>
}

function RemoveFromCart({ product }: { product: Product }) {
    const { removeItem } = useStore()

    return <Button onClick={() => removeItem(product)}>Remove from cart</Button>
}

function ClearCart() {
    const { resetCart } = useStore()

    return <Button onClick={() => resetCart()}>Clear cart</Button>
}

export { AddToCart, RemoveFromCart, ClearCart }
