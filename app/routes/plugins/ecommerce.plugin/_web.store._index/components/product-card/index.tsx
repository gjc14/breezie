import { Product } from '../../../_web.store/hooks/cart'
import { ProductCardImageSection } from './image-section'
import { ProductCardSpecSection } from './spec-section'

export const ProductCard = ({
    product,
    storeRoute,
}: {
    product: Product
    storeRoute: string
}) => {
    return (
        <div className="relative w-full max-w-xs min-w-60 border rounded-lg bg-primary-foreground shadow-md overflow-hidden">
            <ProductCardImageSection
                product={product}
                storeRoute={storeRoute}
            />

            <ProductCardSpecSection product={product} storeRoute={storeRoute} />
        </div>
    )
}
