import { Product } from '../hooks/cart'

const getProducts = async (): Promise<{ products: Product[] }> => {
    return { products: product }
}

const product: Product[] = [
    {
        id: '1',
        title: 'Product 1',
        description: 'Product description',
        slug: 'product-1',
        price: 100,
        discountPrice: 50,
        stock: 10,
        brand: 'Brand',
        category: 'Category',
        thumbnail: 'https://placehold.co/50/000000/FFF',
        images: [
            'https://placehold.co/400/000000/FFF',
            'https://placehold.co/400/000000/FFF',
            'https://placehold.co/400/000000/FFF',
        ],
    },
    {
        id: '2',
        title: 'Product 2',
        description: 'Product description',
        slug: 'product-2',
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
    },
]

export { getProducts }
