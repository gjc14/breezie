import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

import { getSEO } from '~/lib/db/seo.server'
import { MainWrapper } from '../../components/wrappers'
import { Cart } from './components/cart'
import { CartDiscount } from './components/cart-discount'
import { CartSummary } from './components/cart-summary'
import { AlsoRecommended } from './components/also-recommended'
import { getProducts } from '../data/products.server'

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

    // TODO: Fetch products recommendation
    const { products } = await getProducts()

    try {
        return json({ seo, productsRecommendations: products })
    } catch (error) {
        console.error(error)
        return json({ seo, productsRecommendations: products })
    }
}

export default function StoreCart() {
    const { seo, productsRecommendations } = useLoaderData<typeof loader>()

    return (
        <MainWrapper className="p-3 space-y-3">
            <h1 className="visually-hidden">{seo?.title}</h1>

            <h2 className="text-center my-6">Store cart</h2>

            <div className="w-full grid grid-cols-2 gap-3">
                <div className="space-y-3">
                    <Cart className="rounded-md h-fit" storeRoute={'/store'} />
                    <CartDiscount className="rounded-md h-fit" />
                </div>

                <CartSummary className="rounded-md h-fit" />
            </div>

            <AlsoRecommended
                className="w-full rounded-md h-fit"
                products={productsRecommendations}
            />

            <Outlet />
        </MainWrapper>
    )
}
