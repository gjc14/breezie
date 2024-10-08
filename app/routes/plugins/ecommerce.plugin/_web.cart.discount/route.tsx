import { ActionFunctionArgs, json } from '@remix-run/node'

import { Discount } from '../_web.store/hooks/cart'

export const action = async ({ request }: ActionFunctionArgs) => {
    if (request.method !== 'POST') {
        throw new Response('Method not allowed', { status: 405 })
    }

    const formData = await request.formData()
    const discountCode = formData.get('discount-code')

    if (!discountCode || typeof discountCode !== 'string') {
        throw new Response('Invalid argument', { status: 400 })
    }

    try {
        console.log('Discount code:', discountCode)

        // TODO: Implement discount code validation and return type Discount
        const discount: Discount = {
            target: {
                totalAmount: false,
                products: [
                    {
                        id: '1',
                        title: 'Product 1',
                    },
                ],
            },
            // discountPercentage: 10,
            discountPrice: 50,
        }

        return json({
            msg: 'Discount code applied',
            data: discount,
        })
    } catch (error) {
        console.error(error)
        return json({ err: 'Currently not available, please try again later' })
    }
}
