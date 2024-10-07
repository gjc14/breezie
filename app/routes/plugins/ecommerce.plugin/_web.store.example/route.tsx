import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'

import { Textarea } from '~/components/ui/textarea'
import { getSEO } from '~/lib/db/seo.server'
import { ClearCart } from '../_web.store/components/cart-fn'
import { useStore } from '../_web.store/components/hooks/cart'
import CartItemCard from './components/cart-item-card'
import ProductItemCard from './components/product-item-card'
import { getProducts } from './data/products.server'

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

    const { products } = await getProducts()

    try {
        return json({ seo, products })
    } catch (error) {
        console.error(error)
        return json({ seo, products: [] })
    }
}

export default function StoreIndex() {
    const { seo, products } = useLoaderData<typeof loader>()
    const { itemsCount, priceCount, cart } = useStore()

    return (
        <>
            <h1 className="visually-hidden">{seo?.title}</h1>

            <h2 className="text-4xl font-bold">Store Example</h2>

            <div className="w-full grow flex flex-col items-center justify-center">
                <div className="flex flex-col items-center">
                    <p className="font-bold">
                        items: <span>{itemsCount}</span>
                    </p>

                    <p className="font-bold">
                        $ <span>{priceCount}</span>
                    </p>
                </div>

                <div className="w-full grid md:grid-cols-2 gap-3">
                    <div className="w-full border rounded-lg px-3.5 py-2.5">
                        <h3>Products</h3>
                        {products.length === 0 ? (
                            <p>No products</p>
                        ) : (
                            <div className="flex flex-col items-start">
                                <ul className="space-y-1.5 my-3">
                                    {products.map(product => (
                                        <ProductItemCard
                                            key={product.id}
                                            product={product}
                                        />
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="w-full border rounded-lg px-3.5 py-2.5">
                        <h3>Cart</h3>
                        {cart.length === 0 ? (
                            <p>Enpty Cart</p>
                        ) : (
                            <div className="flex flex-col items-start">
                                <ul className="space-y-1.5 my-3">
                                    {cart.map(item => {
                                        return (
                                            <CartItemCard
                                                key={item.id}
                                                product={item}
                                            />
                                        )
                                    })}
                                </ul>
                                <ClearCart />
                            </div>
                        )}
                    </div>
                </div>

                <Textarea
                    className="w-full grow p-2 mt-4"
                    value={JSON.stringify(cart, null, 2)}
                    readOnly
                />
            </div>
        </>
    )
}
