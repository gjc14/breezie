import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

import { getSEO } from '~/lib/db/seo.server'
import { MainWrapper } from '../../components/wrappers'
import { getSavedDeliveries } from '../data/customer.server'
import CheckoutSummary from './components/checkout-summary'
import CorporateIdentity from './components/corporate-identity'
import DeliverySection from './components/delivery'
import PaymentGateway from './components/payment-gateway'

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

    // TODO: Fetch saved addresses
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
        <MainWrapper className="grid gap-6 sm:grid-cols-2 sm:gap-0 h-screen">
            <h1 className="visually-hidden">{seo?.title}</h1>

            <section className="w-auto h-full flex flex-col items-center gap-3 p-3 overflow-scroll sm:px-5 sm:py-8 sm:gap-6">
                <CorporateIdentity />
                <DeliverySection
                    className="max-w-md"
                    savedDeliveries={savedDeliveries}
                />
            </section>

            <section className="w-auto h-full flex flex-col items-center gap-3 p-3 overflow-scroll sm:px-5 sm:py-8 sm:gap-6">
                <div className="w-full max-w-md">
                    <CheckoutSummary />
                    <PaymentGateway />
                </div>
            </section>
            <Outlet />
        </MainWrapper>
    )
}
