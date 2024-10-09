import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'
import { payNow } from '../../lib/payment-gateway'

export const NormalCheckout = ({
    className,
    setEmail,
}: {
    className?: string
    setEmail: React.Dispatch<React.SetStateAction<string>>
}) => {
    const [savePayment, setSavePayment] = useState<boolean>(false)

    const handlePayNow = async () => {
        payNow({ savePayment })
    }

    return (
        <div className={cn('space-y-2', className)}>
            <div>
                <Label htmlFor="card-number">Card number</Label>
                <Input
                    id="card-number"
                    type="card-number"
                    placeholder="2222 2222 2222 2222"
                />

                <div className="w-full flex space-x-1.5">
                    <div className="w-full">
                        <Label htmlFor="expiry-date">Expiry date</Label>
                        <Input
                            id="expiry-date"
                            type="expiry-date"
                            placeholder="MM/YY"
                        />
                    </div>

                    <div className="w-full">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input id="cvc" type="cvc" placeholder="cvc" />
                    </div>
                </div>

                <Label htmlFor="card-holder">Card holder</Label>
                <Input
                    id="card-holder"
                    type="card-holder"
                    placeholder="Enter card holder"
                />

                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    placeholder="my@webie.dev"
                />

                <div className="flex items-center space-x-2 ml-1 mt-3 mb-2">
                    <Checkbox
                        id="save-payment"
                        checked={savePayment}
                        onCheckedChange={check => {
                            check === 'indeterminate'
                                ? setSavePayment(false)
                                : setSavePayment(check)
                        }}
                    />
                    <Label htmlFor="save-payment">Save this card</Label>
                </div>
            </div>

            <Button
                variant={'default'}
                className="w-full"
                onClick={() => handlePayNow()}
            >
                Checkout securely
            </Button>
        </div>
    )
}
