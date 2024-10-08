import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

import { getSEO } from '~/lib/db/seo.server'
import { MainWrapper } from '../../components/wrappers'
import { Cart } from './components/cart'
import { CartDiscount } from './components/cart-discount'
import { CartSummary } from './components/cart-summary'

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

export default function StoreCart() {
    const { seo } = useLoaderData<typeof loader>()

    return (
        <MainWrapper className="p-3">
            <h1 className="visually-hidden">{seo?.title}</h1>

            <h2 className="text-center my-6">Store cart</h2>

            <div className="w-full grid grid-cols-2 m-3 border rounded-md gap-3">
                <Cart className="m-3 rounded-md h-fit" storeRoute={'/store'} />

                <CartSummary className="m-3 rounded-md h-fit" />

                <CartDiscount className="m-3 rounded-md" />
            </div>

            <Outlet />
        </MainWrapper>
    )
}
