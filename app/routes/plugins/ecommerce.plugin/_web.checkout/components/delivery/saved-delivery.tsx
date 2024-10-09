import { Button } from '~/components/ui/button'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog'
import { Separator } from '~/components/ui/separator'
import { cn } from '~/lib/utils'
import { Delivery, useCheckoutDelivery } from '../../../hooks/checkout-delivery'

/**
 * This should be wrapped by Dialog
 */
const SavedDelivery = ({
    delivery,
    className,
}: {
    delivery: Delivery
    className?: string
}) => {
    const { setAddress, setDeliveryMethod } = useCheckoutDelivery()

    return (
        <div className={cn('', className)}>
            <input
                type="radio"
                id={'delivery-' + delivery.id}
                name="delivery"
                value={delivery.id}
                className="hidden peer"
                required
                onChange={e => {
                    if (e.target.checked) {
                        setAddress(delivery.address)
                        setDeliveryMethod(delivery.deliveryMethod)
                    }
                }}
            />
            <label
                htmlFor={'delivery-' + delivery.id}
                className="w-full inline-flex items-center justify-between p-5 text-primary border rounded-lg cursor-pointer peer-checked:border-blue-600 peer-checked:text-blue-600 dark:peer-checked:text-blue-500"
            >
                <div className="w-full space-y-2">
                    <div className="flex items-center justify-between">
                        <h3>{delivery.address.city}</h3>
                        <div className="flex items-center gap-1.5">
                            <button
                                onClick={e => e.stopPropagation()}
                                type="button"
                                className="text-sm font-medium text-muted-foreground hover:text-primary"
                            >
                                Delete
                            </button>

                            <Separator
                                className="h-5 my-1.5"
                                orientation="vertical"
                            />

                            <button
                                onClick={e => e.stopPropagation()}
                                type="button"
                                className="text-sm font-medium text-muted-foreground hover:text-primary"
                            >
                                Edit
                            </button>
                        </div>
                    </div>

                    <div className="w-full">
                        {/* Address */}
                        <p className="text-xs text-muted-foreground">
                            {delivery.address.country}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {delivery.address.address}
                        </p>
                        <Separator className="my-1" />
                        {/* Reciever */}
                        <p className="text-xs text-muted-foreground">
                            {delivery.receiver}
                        </p>
                        <p className="text-xs text-muted-foreground">
                            {delivery.contact}
                        </p>
                        <Separator className="my-1" />
                        {/* Method */}
                        <p className="text-xs text-muted-foreground">
                            {delivery.deliveryMethod.method}
                        </p>
                    </div>
                </div>
            </label>
        </div>
    )
}

const SavedDeliveryDialog = ({
    triggerTitle,
    deliveries,
    className,
}: {
    triggerTitle?: string
    deliveries: Delivery[]
    className?: string
}) => {
    const { setAddress, setDeliveryMethod } = useCheckoutDelivery()

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'} className={cn('', className)}>
                    {triggerTitle ? triggerTitle : 'Choose saved address'}
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-[75vw] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Choose saved address</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-2 xs:grid-cols-2 lg:grid-cols-3">
                    {deliveries.map((delivery, i) => (
                        <DialogClose
                            key={i}
                            className="text-start"
                            onClick={() => {
                                setAddress(delivery.address)
                                setDeliveryMethod(delivery.deliveryMethod)
                            }}
                        >
                            <SavedDelivery delivery={delivery} />
                        </DialogClose>
                    ))}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export { SavedDelivery, SavedDeliveryDialog }
