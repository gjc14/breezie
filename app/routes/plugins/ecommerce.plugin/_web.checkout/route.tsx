import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

import { getSEO } from '~/lib/db/seo.server'
import { MainWrapper } from '../../components/wrappers'
import { getSavedDeliveries } from '../data/customer.server'
import CheckoutSummary from './components/checkout-summary'
import CorporateIdentity from './components/corporate-identity'
import DeliverySection from './components/delivery'

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

    // TODO: Fetch saved deliveries
    const { savedDeliveries } = await getSavedDeliveries()

    try {
        return json({ seo, savedDeliveries: savedDeliveries })
    } catch (error) {
        console.error(error)
        return json({ seo, savedDeliveries: [] })
    }
}

export default function StoreCheckout() {
    const { seo, savedDeliveries } = useLoaderData<typeof loader>()

    return (
        <MainWrapper className="grid gap-6 sm:grid-cols-2 sm:gap-0 sm:h-screen">
            <h1 className="visually-hidden">{seo?.title}</h1>

            <section className="w-auto h-full flex flex-col items-center gap-6 px-3 py-8 overflow-scroll sm:px-5">
                <CorporateIdentity className="my-6" />
                <DeliverySection
                    className="max-w-md"
                    savedDeliveries={savedDeliveries}
                />
            </section>

            <section className="w-auto h-full flex flex-col items-center gap-6 px-3 py-8 overflow-scroll sm:px-5">
                <div className="w-full max-w-md my-8 space-y-8">
                    <CheckoutSummary />
                    <Outlet />
                </div>
            </section>
        </MainWrapper>
    )
}
