import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { UnderConstruction } from '~/components/under-construction'
import { Nav } from './components/nav'
import { Footer } from './components/footer'
import { getSEO } from '~/lib/db/seo.server'

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

export default function CV() {
    const { seo } = useLoaderData<typeof loader>()

    return (
        <>
            <h1 className="visually-hidden">{seo?.title}</h1>
            <UnderConstruction nav={<Nav />} footer={<Footer />} />
        </>
    )
}
