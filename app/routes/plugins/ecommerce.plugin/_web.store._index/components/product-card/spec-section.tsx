import { Button } from '~/components/ui/button'
import { AddToCart } from '../../../_web.store/components/cart-fn'
import { Product } from '../../../_web.store/hooks/cart'
import { formatCurrency } from '../../../_web.store/lib/utils'

export const ProductCardSpecSection = ({
    product,
    storeRoute,
}: {
    product: Product
    storeRoute: string
}) => {
    return (
        <div className="mb-3.5 mx-3.5 flex flex-col gap-3">
            <a href={`${storeRoute}/${product.slug}`} className="space-y-2">
                <h3 className="tracking-tight leading-5 text-primary hover:underline">
                    {product.title}
                </h3>

                <div className="h-5 flex items-center gap-2 text-sm">
                    <div>{product.description}</div>
                </div>
            </a>
            <div className="flex flex-wrap items-center justify-between gap-1">
                <p className="text-primary space-x-1 tracking-tight">
                    {/* Discount price */}
                    {product.discountPercentage && (
                        <span className="text-base font-bold md:text-lg">
                            {`${formatCurrency.format(
                                product.price *
                                    (1 - product.discountPercentage / 100)
                            )}`}
                        </span>
                    )}

                    {product.discountPrice && (
                        <span className="text-base font-bold md:text-lg">
                            {`${formatCurrency.format(
                                product.price - product.discountPrice
                            )}`}
                        </span>
                    )}

                    <span
                        className={
                            product.discountPercentage || product.discountPrice
                                ? 'text-sm line-through'
                                : 'text-base font-bold md:text-lg'
                        }
                    >{`${formatCurrency.format(product.price)}`}</span>
                </p>
                {product.rating ? (
                    <div className="flex items-center">
                        <svg
                            aria-hidden="true"
                            className="h-5 w-5 text-yellow-300"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                        <span className="text-primary px-1 py-0.5 text-sm font-semibold">
                            {product.rating.toFixed(1)}
                        </span>
                    </div>
                ) : (
                    <span className="text-primary text-sm">No rating</span>
                )}
            </div>

            <AddToCart product={product}>
                <Button variant={'default'} className="w-full">
                    Add to cart
                </Button>
            </AddToCart>
        </div>
    )
}
