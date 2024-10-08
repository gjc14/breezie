import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import { getSEO } from '~/lib/db/seo.server'
import { Cart } from '../_web.cart/components/cart'
import { ProductCard } from './components/product-card'
import { getProducts } from './data/products.server'
import { Button } from '~/components/ui/button'

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
        const { products } = await getProducts()
        return json({ seo, products })
    } catch (error) {
        console.error(error)
        return json({ seo, products: [] })
    }
}

export default function StoreIndex() {
    const { seo, products } = useLoaderData<typeof loader>()

    return (
        <>
            <h1 className="visually-hidden">{seo?.title}</h1>

            <h2 className="text-4xl font-bold my-6">Webie E-Commerce</h2>

            <div className="w-full border rounded-md overflow-scroll">
                <ul className="w-fit flex gap-3 p-6">
                    {products.map(product => (
                        <li key={product.id}>
                            <ProductCard
                                product={product}
                                storeRoute={'/store'}
                            />
                        </li>
                    ))}
                </ul>
            </div>

            <Cart className="my-6 rounded-md" storeRoute={'/store'} />

            <Link to="/cart">
                <Button className="w-full">View cart</Button>
            </Link>
        </>
    )
}
