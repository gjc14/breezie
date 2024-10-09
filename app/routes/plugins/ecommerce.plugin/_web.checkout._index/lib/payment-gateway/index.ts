import { generateOrderId } from '../../../lib/utils'

type PaymentPromiseType = {
    orderId: string
    payment: PaymentInfo
}

interface PaymentInfo {
    id: string
    provider: string
    method: string
    status: string
    date: string
    details: {
        amount: number
        currency: string
        card?: {
            holder: string
            last4: string
        }
    }
}

const PaymentReturn = {
    orderId: '123456',
    payment: {
        id: '123456',
        provider: 'stripe',
        method: 'card',
        status: 'success',
        date: '2022-01-01',
        details: {
            amount: 100,
            currency: 'USD',
            card: {
                holder: 'John Doe',
                last4: '4242',
            },
        },
    },
}

const payNow = async ({
    savePayment,
}: {
    savePayment: boolean
}): Promise<PaymentPromiseType> => {
    const orderId = generateOrderId()
    console.log('Pay now', orderId, 'savePayment', savePayment)
    return PaymentReturn
}

interface PayLaterProps {
    email: string
}
const payLater = async ({
    email,
}: PayLaterProps): Promise<PaymentPromiseType> => {
    const orderId = generateOrderId()
    console.log('Pay later', orderId)

    // Send email to customer
    return PaymentReturn
}

export { payNow, payLater }
