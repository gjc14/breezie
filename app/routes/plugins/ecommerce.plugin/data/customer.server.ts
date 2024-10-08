import { Delivery } from '../hooks/checkout-delivery'

const getSavedDeliveries = async () => {
    return { savedDeliveries: savedDeliveries }
}

export { getSavedDeliveries }

const savedDeliveries: Delivery[] = [
    {
        id: '1',
        receiver: 'Camila Rodriguez',
        contact: '57-8123456789',
        deliveryMethod: { method: 'FedEx', price: 130 },
        address: {
            country: 'Colombia',
            city: 'Cundinamarca',
            address: 'Cra. 1 #18a-12, La Candelaria, Bogotá',
        },
    },
    {
        id: '2',
        receiver: 'Jane Doe',
        contact: '1-8123456789',
        deliveryMethod: { method: 'Seven Eleven Pickup', price: 60 },
        address: {
            country: 'USA',
            city: 'NY',
            address: '345 Park Ave, New York',
        },
    },
    {
        id: '3',
        receiver: '林',
        contact: '886-999000000',
        deliveryMethod: { method: '黑貓宅急便', price: 130 },
        address: {
            country: '臺灣',
            city: '台北市',
            address: '文山區指南路二段0號18樓之36',
        },
    },
    {
        id: '4',
        receiver: 'Jane Doe',
        contact: '1-8123456789',
        deliveryMethod: { method: 'Seven Eleven Pickup', price: 50 },
        address: {
            country: 'USA',
            city: 'SF',
            address: '345 Park Ave, San Francisco',
        },
    },
    {
        id: '5',
        receiver: 'Jane Doe',
        contact: '1-8123456789',
        deliveryMethod: { method: 'Seven Eleven Pickup', price: 50 },
        address: {
            country: 'USA',
            city: 'IL',
            address: '345 Park Ave, Chicago',
        },
    },
    {
        id: '6',
        receiver: '中川',
        contact: '81-555222000',
        deliveryMethod: { method: 'Seven Eleven Pickup', price: 50 },
        address: {
            country: '日本',
            city: 'Yamanashi',
            address: '3 Chome-5-16 Shimoyoshida, Fujiyoshida, 日本',
        },
    },
]
