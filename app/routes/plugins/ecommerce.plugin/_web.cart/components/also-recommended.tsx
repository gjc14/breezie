import { cn } from '~/lib/utils'
import { ProductCardImageSection } from '../../_web.store._index/components/product-card/image-section'
import { Product } from '../../_web.store/hooks/cart'
import { ProductCardSpecSection } from '../../_web.store._index/components/product-card/spec-section'

export const AlsoRecommended = ({
    products,
    className,
}: {
    products: Product[]
    className?: string
}) => {
    return (
        <section className={cn('h-fit p-5 border space-y-3', className)}>
            <h3 className="text-center sm:text-start">You may also like</h3>

            <div className="relative w-full flex flex-col items-center gap-3 overflow-scroll sm:flex-row">
                {products.map((p, i) => (
                    <RecommendedProductCard key={i} product={p} />
                ))}
            </div>
        </section>
    )
}

const RecommendedProductCard = ({ product }: { product: Product }) => {
    return (
        <div className="relative w-full max-w-xs min-w-60 border rounded-lg bg-primary-foreground shadow-md">
            <ProductCardImageSection product={product} storeRoute={'/store'} />

            <ProductCardSpecSection product={product} storeRoute={'/store'} />
        </div>
    )
}
