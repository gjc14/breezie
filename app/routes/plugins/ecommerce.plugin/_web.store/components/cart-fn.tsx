import { MinusCircle, PlusCircle } from 'lucide-react'
import { ReactNode } from 'react'

import { Button } from '~/components/ui/button'
import { Product, useStore } from './hooks/cart'

function AddToCart({
    product,
    byQuantity,
    children,
}: {
    product: Product
    byQuantity?: number
    children?: ReactNode
}) {
    const { addItem } = useStore()

    if (children)
        return (
            <span onClick={() => addItem(product, byQuantity)}>{children}</span>
        )

    return (
        <Button
            onClick={() => addItem(product, byQuantity)}
            variant={'ghost'}
            size={'sm'}
            className="w-fit h-fit p-1"
        >
            <PlusCircle size={20} />
        </Button>
    )
}

function RemoveFromCart({
    product,
    removeAll,
    children,
}: {
    product: Product
    removeAll?: boolean
    children?: ReactNode
}) {
    const { removeItem } = useStore()

    if (children)
        return (
            <span onClick={() => removeItem(product, removeAll)}>
                {children}
            </span>
        )

    return (
        <Button
            onClick={() => removeItem(product, removeAll)}
            variant={'ghost'}
            size={'sm'}
            className="w-fit h-fit p-1"
        >
            <MinusCircle size={20} />
        </Button>
    )
}

function ClearCart({ children }: { children?: ReactNode }) {
    const { resetCart } = useStore()

    return (
        <Button onClick={() => resetCart()} asChild={!!children}>
            {children || 'Clear cart'}
        </Button>
    )
}

export { AddToCart, ClearCart, RemoveFromCart }
