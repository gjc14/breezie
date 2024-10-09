import { ActionFunctionArgs, json } from '@remix-run/node'
import PaymentGateway from './components/payment-form'

export const action = async ({ request }: ActionFunctionArgs) => {
    const jsonData = await request.json()

    return json({ msg: 'Payment successful' })
}

export default function StoreCheckoutPayment() {
    return <PaymentGateway />
}
