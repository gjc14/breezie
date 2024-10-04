import { json, LoaderFunctionArgs } from '@remix-run/node'

export const loader = async ({ request }: LoaderFunctionArgs) => {
    try {
        return json({})
    } catch (error) {
        console.error(error)
        return json({})
    }
}

export default function StoreCheckoutPayments() {
    return <></>
}
