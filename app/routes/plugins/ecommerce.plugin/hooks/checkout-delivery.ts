import { z } from 'zod'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

const addressSchema = z.object({
    country: z.string(),
    city: z.string(),
    address: z.string(),
})

const deliveryMethodSchema = z.object({
    method: z.string(),
    price: z.number(),
})
type DeliveryMethod = z.infer<typeof deliveryMethodSchema>

const deliverySchema = z.object({
    id: z.string(),
    receiver: z.string(),
    contact: z.string(),
    deliveryMethod: deliveryMethodSchema,
    address: addressSchema,
})
export type Delivery = z.infer<typeof deliverySchema>

type Action = {
    setReceiver: (receiver: string) => void
    setContact: (contact: string) => void
    setDeliveryMethod: (deliveryMethod: DeliveryMethod) => void
    setAddress: (address: Delivery['address']) => void
    setDelivery: (delivery: Delivery) => void
}

const initialState: Delivery = {
    id: '',
    receiver: '',
    contact: '',
    deliveryMethod: { method: '', price: 0 },
    address: { country: '', city: '', address: '' },
}

export const useCheckoutDelivery = create(
    persist<Delivery & Action>(
        (set, get) => ({
            id: initialState.id,
            receiver: initialState.receiver,
            contact: initialState.contact,
            deliveryMethod: initialState.deliveryMethod,
            address: initialState.address,
            setReceiver: receiver => {
                set({ receiver })
            },
            setContact: contact => {
                set({ contact })
            },
            setDeliveryMethod: deliveryMethod => {
                set({ deliveryMethod })
            },
            setAddress: address => {
                set({ address })
            },
            setDelivery: delivery => {
                set(delivery)
            },
            resetCart: () => {
                set(initialState)
            },
        }),
        {
            name: 'store-checkout-delivery', // name of the item in the storage (must be unique)
            // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
)
