import { Product } from '~/routes/_web.store/components/hooks/cart'

const getProducts = async (): Promise<{ products: Product[] }> => {
    return { products: [product, product2] }
}

const product: Product = {
    id: '1',
    title: 'Product 1',
    description: 'Product description',
    price: 100,
    discountPercentage: 10,
    rating: 4,
    stock: 10,
    brand: 'Brand',
    category: 'Category',
    thumbnail: 'https://placehold.co/50/000000/FFF',
    images: [
        'https://placehold.co/400/000000/FFF',
        'https://placehold.co/400/000000/FFF',
        'https://placehold.co/400/000000/FFF',
    ],
}

const product2: Product = {
    id: '2',
    title: 'Product 2',
    description: 'Product description',
    price: 200,
    discountPercentage: 10,
    rating: 4,
    stock: 10,
    brand: 'Brand',
    category: 'Category',
    thumbnail: 'https://placehold.co/50/000000/FFF',
    images: [
        'https://placehold.co/400/000000/FFF',
        'https://placehold.co/400/000000/FFF',
        'https://placehold.co/400/000000/FFF',
    ],
}

export { getProducts }
