import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

import { getSEO } from '~/lib/db/seo.server'
import { MainWrapper } from '../../components/wrappers'
import Billing from './components/billing'
import CheckoutSummary from './components/checkout-summary'
import CorporateIdentity from './components/corporate-identity'
import PaymentGateway from './components/payment-gateway'
import Shipping from './components/shipping'

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

    try {
        return json({ seo, savedAddress: [] })
    } catch (error) {
        console.error(error)
        return json({ seo, savedAddress: [] })
    }
}

export default function StoreCheckout() {
    const { seo, savedAddress } = useLoaderData<typeof loader>()

    return (
        <MainWrapper className="grid grid-cols-2 h-screen">
            <h1 className="visually-hidden">{seo?.title}</h1>

            <section className="w-auto h-full grid gap-3 p-2 overflow-scroll">
                <CorporateIdentity />
                <Shipping className="max-w-md" savedAddress={savedAddress} />
                <Billing className="max-w-md" />
            </section>

            <section className="h-full grid gap-3 p-2 bg-accent">
                <CheckoutSummary />
                <PaymentGateway />
            </section>
            <Outlet />
        </MainWrapper>
    )
}
