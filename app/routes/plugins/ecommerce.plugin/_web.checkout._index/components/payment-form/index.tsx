import { useFetcher } from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Loading } from '~/components/loading'
import { Button } from '~/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '~/components/ui/dialog'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { cn, isConventionalSuccess } from '~/lib/utils'
import SeparatorWithText from '~/routes/plugins/components/separator-with-text'
import { payLater } from '../../lib/payment-gateway'
import { calculateTotal } from '../../../lib/utils'
import { ExpressCheckout } from './express-checkout'
import { NormalCheckout } from './normal-checkout'

const PaymentGateway = ({ className }: { className?: string }) => {
    const fetcher = useFetcher()
    const [open, setOpen] = useState(false)
    const [email, setEmail] = useState('')

    const total = calculateTotal()

    const isSubmitting = fetcher.state === 'submitting'

    useEffect(() => {
        if (isConventionalSuccess(fetcher.data)) {
            setOpen(false)
            setEmail('')
        }
    }, [fetcher.data])

    const handlePayLater = async () => {
        setOpen(true)
        payLater({ email })
    }

    return (
        <div className={cn('', className)}>
            <div className="border border-border rounded-lg px-5 py-5">
                <h5 className="mb-5">Payment Gateway ${total}</h5>

                <ExpressCheckout />

                <SeparatorWithText className="text-muted">Or</SeparatorWithText>

                <NormalCheckout setEmail={setEmail} />

                <SeparatorWithText className="text-muted">Or</SeparatorWithText>

                <Button
                    variant={'ghost'}
                    className="w-full"
                    onClick={() => handlePayLater()}
                >
                    Pay later
                </Button>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                Enter your email to save your order
                            </DialogTitle>
                            <DialogDescription>
                                {/* TODO: Email with payment link */}
                                We will send you an email with the payment link
                                to complete your order.
                            </DialogDescription>
                        </DialogHeader>
                        <div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                onClick={() => {
                                    fetcher.submit(
                                        { email },
                                        {
                                            method: 'post',
                                            action: '/checkout/api/pay-later',
                                        }
                                    )
                                }}
                            >
                                <span
                                    className={
                                        isSubmitting
                                            ? 'opacity-0'
                                            : 'opacity-100'
                                    }
                                >
                                    Send payment link
                                </span>
                                <Loading
                                    className={`absolute ${
                                        isSubmitting
                                            ? 'opacity-100'
                                            : 'opacity-0'
                                    }`}
                                />
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}

export default PaymentGateway
