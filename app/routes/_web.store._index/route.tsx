import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getSEO } from '~/lib/db/seo.server'
import {
    AddToCart,
    ClearCart,
    RemoveFromCart,
} from '../_web.store/components/cart-action'
import { Product, useStore } from '../_web.store/components/hooks/cart'
import { Textarea } from '~/components/ui/textarea'

export const meta: MetaFunction<typeof loader> = ({ data }) => {
    return data?.seo
        ? [
              { title: data.seo.title },
              { name: 'description', content: data.seo.description },
          ]
        : []
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const { seo } = await getSEO(new URL(request.url).pathname)

    try {
        return json({ seo })
    } catch (error) {
        console.error(error)
        return json({ seo })
    }
}

export default function StoreIndex() {
    const { seo } = useLoaderData<typeof loader>()
    const { totalItems, totalPrice, cart } = useStore()

    return (
        <>
            <h1 className="visually-hidden">{seo?.title}</h1>

            <h2 className="text-4xl font-bold">Store index</h2>

            <div className="w-full flex flex-col items-center justify-center">
                <span>Count: {totalItems}</span>
                <span>Total: {totalPrice}</span>

                <AddToCart product={product} />
                <AddToCart product={product2} />
                <RemoveFromCart product={product} />
                <RemoveFromCart product={product2} />
                <ClearCart />

                <Textarea
                    className="w-full p-2 mt-4"
                    value={JSON.stringify(cart, null, 2)}
                    readOnly
                    rows={25}
                />
            </div>
        </>
    )
}

const product: Product = {
    id: 1,
    title: 'Product title',
    description: 'Product description',
    price: 100,
    discountPercentage: 10,
    rating: 4,
    stock: 10,
    brand: 'Brand',
    category: 'Category',
    thumbnail: 'https://placehold.co/150/000000/FFF',
    images: [
        'https://placehold.co/400/000000/FFF',
        'https://placehold.co/400/000000/FFF',
        'https://placehold.co/400/000000/FFF',
    ],
}

const product2: Product = {
    id: 2,
    title: 'Product title',
    description: 'Product description',
    price: 200,
    discountPercentage: 10,
    rating: 4,
    stock: 10,
    brand: 'Brand',
    category: 'Category',
    thumbnail: 'https://placehold.co/150/000000/FFF',
    images: [
        'https://placehold.co/400/000000/FFF',
        'https://placehold.co/400/000000/FFF',
        'https://placehold.co/400/000000/FFF',
    ],
}
