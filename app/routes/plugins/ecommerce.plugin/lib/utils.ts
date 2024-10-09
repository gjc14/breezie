import { useStore } from '../hooks/cart'
import { useCheckoutDelivery } from '../hooks/checkout-delivery'

export const formatCurrency = new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: 'NTD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
})

export const calculateDiscount = () => {
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

export const calculateTotal = () => {
    const { priceCount } = useStore()
    const { deliveryMethod } = useCheckoutDelivery()
    const { discountAmount } = calculateDiscount()

    return priceCount - discountAmount + deliveryMethod.price
}
