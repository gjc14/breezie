import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

export const ExpressCheckout = ({ className }: { className?: string }) => {
    const handleApplePay = async () => {
        console.log('Apple Pay')
    }

    const handlePayPal = async () => {
        console.log('PayPal')
    }

    return (
        <div className={cn('flex gap-2', className)}>
            <Button
                variant={'default'}
                className="w-full"
                onClick={() => handleApplePay()}
            >
                Apple Pay
            </Button>
            <Button
                variant={'default'}
                className="w-full"
                onClick={() => handlePayPal()}
            >
                PayPal
            </Button>
        </div>
    )
}
