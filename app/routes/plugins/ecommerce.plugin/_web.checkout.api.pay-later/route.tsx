import { ActionFunctionArgs, json } from '@remix-run/node'
import { z } from 'zod'

export const action = async ({ request }: ActionFunctionArgs) => {
    if (request.method !== 'POST') {
        return new Response('Method not allowed', { status: 405 })
    }

    const formData = await request.formData()
    const email = formData.get('email')

    const { success, data } = z.string().email().safeParse(email)

    if (!success) {
        return json({ err: 'Invalid email' })
    }

    try {
        // TODO: Send email to customer
        console.log('Pay later', data)
        return json({ msg: `Payment url sent to ${data}!` })
    } catch (error) {
        console.error(error)
        return json({ err: 'Failed to send email' })
    }
}
