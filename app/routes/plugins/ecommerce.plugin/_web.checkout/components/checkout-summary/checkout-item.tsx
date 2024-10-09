import { Equal, X } from 'lucide-react'

import { Separator } from '~/components/ui/separator'
import { Store } from '../../../hooks/cart'
import { formatCurrency } from '../../../lib/utils'

export const CheckoutItem = ({
    product,
}: {
    product: Store['cart'][number]
}) => {
    return (
        <li className="flex justify-between items-center gap-3">
            <div className="w-full flex items-center gap-2 sm:gap-3">
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

            <div className=" flex items-baseline justify-end gap-1 sm:ml-auto md:gap-2">
                <p className="flex items-center text-sm space-x-1.5">
                    <span>{product.price}</span>
                    <X size={12} />
                    <span>{product.quantity}</span>
                    <Equal size={12} />
                </p>
                <p className="font-bold">
                    {formatCurrency.format(
                        product.price * (product?.quantity || 0)
                    )}
                </p>
            </div>
        </li>
    )
}
