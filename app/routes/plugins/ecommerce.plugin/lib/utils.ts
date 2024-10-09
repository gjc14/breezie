import { useStore } from '../hooks/cart'
import { useCheckoutDelivery } from '../hooks/checkout-delivery'

export const formatCurrency = new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'NTD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
})

export const calculateDiscountSaving = () => {
    const { cart, priceCount, discount } = useStore()
    const { discountPercentage, discountPrice, target } = discount

    let discountAmount = 0
    if (discountPercentage) {
        if (target.totalAmount) {
            discountAmount = priceCount * (discountPercentage / 100)
        } else {
            discountAmount = cart.reduce((acc, item) => {
                const productIds = target.products.map(product => product.id)

                if (productIds.includes(item.id)) {
                    return (
                        acc +
                        item.price * item.quantity * (discountPercentage / 100)
                    )
                }
                return acc
            }, 0)
        }
    } else if (discountPrice) {
        discountAmount = discountPrice
    }

    return { discountPercentage, discountPrice, target, discountAmount }
}

export const calculateSaleSaving = () => {
    const { cart } = useStore()
    return cart.reduce((acc, item) => {
        const { discountPercentage, discountPrice } = item
        if (discountPercentage) {
            return acc + item.price * (discountPercentage / 100) * item.quantity
        } else if (discountPrice) {
            return acc + discountPrice * item.quantity
        }
        return acc
    }, 0)
}

export const calculateTotal = () => {
    const { priceCount } = useStore()
    const { deliveryMethod } = useCheckoutDelivery()
    const { discountAmount } = calculateDiscountSaving()

    return priceCount - discountAmount + deliveryMethod.price
}

export const generateOrderId = () => {
    const date = new Date()
    const dateString = date
        .toLocaleString('sv-SE', {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        })
        .replace(/\D/g, '')
    return 'ODR-' + dateString + '-' + Math.floor(Math.random() * 1000)
}
