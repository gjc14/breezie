import { z } from 'zod'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export const productSchema = z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    price: z.number(),
    discountPercentage: z.number().optional(),
    discountPrice: z.number().optional(),
    stock: z.number(),
    category: z.string(),
    subCategory: z.string().optional(),
    tag: z.string().optional(),
    thumbnail: z.string().optional(),
    images: z.array(z.string()).optional(),
    brand: z.string(),
    rating: z.number().optional(),
})
export type Product = z.infer<typeof productSchema>

type Store = {
    cart: (Product & { quantity: number })[]
    itemsCount: number
    priceCount: number
}

type Action = {
    addItem: (Item: Product, byQuantity?: number) => void
    removeItem: (Item: Product, removeAll?: boolean) => void
    setItem: (Item: Product, quantity: number) => void
    resetCart: () => void
}

const initialState: Store = {
    cart: [],
    itemsCount: 0,
    priceCount: 0,
}

export const useStore = create(
    persist<Store & Action>(
        (set, get) => ({
            cart: initialState.cart,
            itemsCount: initialState.itemsCount,
            priceCount: initialState.priceCount,
            addItem: (product: Product, byQuantity) => {
                const cart = get().cart
                const cartItem = cart.find(item => item.id === product.id)
                const q = byQuantity || 1

                // Just increase quantity if product is already in the cart
                if (cartItem) {
                    const updatedCart = cart.map(item =>
                        item.id === product.id
                            ? {
                                  ...item,
                                  quantity: item.quantity + q,
                              }
                            : item
                    )
                    set(state => ({
                        cart: updatedCart,
                        itemsCount: state.itemsCount + q,
                        priceCount: state.priceCount + q * product.price,
                    }))
                } else {
                    const updatedCart = [...cart, { ...product, quantity: q }]

                    set(state => ({
                        cart: updatedCart,
                        itemsCount: state.itemsCount + q,
                        priceCount: state.priceCount + q * product.price,
                    }))
                }
            },
            removeItem: (product: Product, removeAll) => {
                const cart = get().cart
                const cartItem = cart.find(item => item.id === product.id)

                if (!cartItem) {
                    console.warn('Item not found in the cart')
                    return
                }

                const q = removeAll ? cartItem?.quantity : 1

                const updatedCart = removeAll
                    ? // Remove all
                      cart.filter(item => item.id !== product.id)
                    : // Minus one
                      cart
                          .map(item =>
                              item.id === product.id
                                  ? { ...item, quantity: item.quantity - 1 }
                                  : item
                          )
                          .filter(item => item.quantity > 0)

                set(state => ({
                    cart: updatedCart,
                    itemsCount: state.itemsCount - q,
                    priceCount: state.priceCount - q * product.price,
                }))
            },
            setItem: (product: Product, quantity) => {
                const cart = get().cart
                const cartItem = cart.find(item => item.id === product.id)

                if (!cartItem) {
                    console.warn('Item not found in the cart')
                    return
                }

                set(state => ({
                    cart: cart.map(item =>
                        item.id === product.id ? { ...item, quantity } : item
                    ),
                    itemsCount: state.itemsCount + quantity - cartItem.quantity,
                    priceCount:
                        state.priceCount +
                        product.price * quantity -
                        product.price * cartItem.quantity,
                }))
            },
            resetCart: () => {
                set(initialState)
            },
        }),
        {
            name: 'store-cart', // name of the item in the storage (must be unique)
            // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        }
    )
)
