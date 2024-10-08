import { Badge } from '~/components/ui/badge'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '~/components/ui/carousel'
import { Product } from '../../../hooks/cart'

export const ProductCardImageSection = ({
    product,
    storeRoute,
}: {
    product: Product
    storeRoute: string
}) => {
    return (
        <>
            {product.images ? (
                <Carousel className="w-full p-3 overflow-visible">
                    <CarouselContent>
                        {product.images.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="relative w-full border border-border rounded-xl overflow-hidden">
                                    <a href={`${storeRoute}/${product.slug}`}>
                                        <img
                                            className="object-cover"
                                            src={image}
                                            alt={product.title}
                                        />
                                    </a>

                                    {(product.discountPercentage ||
                                        product.discountPrice) && (
                                        <Badge
                                            variant={'secondary'}
                                            className="absolute top-0 left-0 m-2 rounded-full"
                                        >
                                            {product.discountPercentage && (
                                                <span>
                                                    {`${product.discountPercentage}%`}{' '}
                                                    OFF
                                                </span>
                                            )}
                                            {product.discountPrice && (
                                                <span>{`$${product.discountPrice} Discount`}</span>
                                            )}
                                        </Badge>
                                    )}
                                    <CarouselPrevious className="absolute left-1 top-auto -bottom-2 border-0" />
                                    <CarouselNext className="absolute right-1 top-auto -bottom-2 border-0" />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            ) : (
                <img
                    className="h-full w-full object-cover"
                    src={'/logos/webie-black-300.png'}
                    alt={product.title}
                />
            )}
        </>
    )
}
