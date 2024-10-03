import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export interface Product {
    id: number
    title: string
    description: string
    price: number
    discountPercentage: number
    rating: number
    stock: number
    brand: string
    category: string
    thumbnail: string
    images: string[]
}

type Store = {
    cart: (Product & { quantity: number })[]
    totalItems: number
    totalPrice: number
}

type Action = {
    addItem: (Item: Product) => void
    removeItem: (Item: Product) => void
    resetCart: () => void
}

const initialState: Store = {
    cart: [],
    totalItems: 0,
    totalPrice: 0,
}

export const useStore = create(
    persist<Store & Action>(
        (set, get) => ({
            cart: initialState.cart,
            totalItems: initialState.totalItems,
            totalPrice: initialState.totalPrice,
            addItem: (product: Product) => {
                const cart = get().cart
                const cartItem = cart.find(item => item.id === product.id)

                // Increase quantity if product is already in the cart
                if (cartItem) {
                    const updatedCart = cart.map(item =>
                        item.id === product.id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    )
                    set(state => ({
                        cart: updatedCart,
                        totalItems: state.totalItems + 1,
                        totalPrice: state.totalPrice + product.price,
                    }))
                } else {
                    const updatedCart = [...cart, { ...product, quantity: 1 }]

                    set(state => ({
                        cart: updatedCart,
                        totalItems: state.totalItems + 1,
                        totalPrice: state.totalPrice + product.price,
                    }))
                }
            },
            removeItem: (product: Product) => {
                const cart = get().cart
                const cartItem = cart.find(item => item.id === product.id)

                if (cartItem) {
                    const updatedCart = cart
                        .map(item =>
                            item.id === product.id
                                ? { ...item, quantity: item.quantity - 1 }
                                : item
                        )
                        .filter(item => item.quantity > 0)

                    set(state => ({
                        cart: updatedCart,
                        totalItems: state.totalItems - 1,
                        totalPrice: state.totalPrice - product.price,
                    }))
                }
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
