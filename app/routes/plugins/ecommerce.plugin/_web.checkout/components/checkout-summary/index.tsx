import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '~/components/ui/accordion'
import { cn } from '~/lib/utils'
import { CartAccounts } from '../../../_web.cart/components/cart-summary'
import { useStore } from '../../../hooks/cart'
import { useCheckoutDelivery } from '../../../hooks/checkout-delivery'
import { calculateTotal, formatCurrency } from '../../../lib/utils'
import { CheckoutItem } from './checkout-item'

const CheckoutSummary = ({ className }: { className?: string }) => {
    const { cart, itemsCount } = useStore()
    const { deliveryMethod } = useCheckoutDelivery()

    const total = calculateTotal()

    return (
        <div className={cn('w-full space-y-3', className)}>
            <div className="border border-border rounded-lg px-5 py-2">
                <h5 className="py-3">Summary</h5>

                <CartAccounts />

                <div className="w-full flex items-center justify-between gap-3 py-3 text-sm font-normal text-primary border-t border-t-secondary">
                    <span>
                        Delivery fee
                        <span className="ml-2 border border-border px-1.5 py-0.5 font-semibold">
                            {deliveryMethod.method}
                        </span>
                    </span>
                    <span>{formatCurrency.format(deliveryMethod.price)}</span>
                </div>

                <div className="w-full flex items-center justify-between gap-3 py-3 text-sm font-bold text-primary border-t border-t-primary">
                    <span>Total</span>
                    <span>{formatCurrency.format(total)}</span>
                </div>
            </div>

            <div className="border border-border rounded-lg px-3.5">
                <Accordion type="single" collapsible className="w-full ">
                    <AccordionItem value="item-1" className="border-none">
                        <AccordionTrigger className="group hover:no-underline">
                            <div className="w-full flex items-center justify-between mr-3">
                                <p className="font-bold underline-offset-4 group-hover:underline">
                                    Products
                                </p>
                                <p className="aspect-square h-6 w-6 flex items-center justify-center ml-2 p-0.5 text-[9px] border border-border rounded-full bg-primary text-primary-foreground">
                                    {itemsCount}
                                </p>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <ul className="space-y-3 my-3 ml-2 mr-5">
                                {cart.map(product => (
                                    <CheckoutItem
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    )
}

export default CheckoutSummary
