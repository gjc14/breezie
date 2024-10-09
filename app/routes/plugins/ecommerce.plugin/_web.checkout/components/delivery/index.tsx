import { Button } from '~/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { cn } from '~/lib/utils'
import { RevealContentOnClick } from '../../../../components/reveal-content-on-click'
import SeparatorWithText from '../../../../components/separator-with-text'
import { Delivery, useCheckoutDelivery } from '../../../hooks/checkout-delivery'
import { DeliveryAddressInput } from './input-delivery'
import { SavedDelivery, SavedDeliveryDialog } from './saved-delivery'

const DeliverySection = ({
    className,
    savedDeliveries,
}: {
    className?: string
    savedDeliveries: Delivery[]
}) => {
    return (
        <Card className={cn('w-full', className)}>
            <CardHeader>
                <CardTitle>Delivery</CardTitle>
                <CardDescription>
                    Choose your delivery method and enter address
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="individual">
                    <TabsList className="w-full grid grid-cols-2">
                        <TabsTrigger
                            value="individual"
                            onClick={() => {
                                // TODO: Toggle between individual and corporate
                            }}
                        >
                            Individual
                        </TabsTrigger>
                        <TabsTrigger
                            value="corporate"
                            onClick={() => {
                                // TODO: Toggle between individual and corporate
                            }}
                        >
                            Corporate
                        </TabsTrigger>
                    </TabsList>

                    {/* There are two styles for customers to chose address */}
                    <TabsContent value="individual">
                        {/* <SavedDeliveryDialog address={savedDeliveries} /> */}
                        <ul className="space-y-2">
                            {savedDeliveries.slice(0, 3).map((delivery, i) => (
                                <li key={i}>
                                    <SavedDelivery delivery={delivery} />
                                </li>
                            ))}
                        </ul>
                        <SavedDeliveryDialog
                            deliveries={savedDeliveries}
                            triggerTitle="More saved addresses"
                            className="w-full my-2"
                        />

                        <SeparatorWithText className="mx-8">
                            Or
                        </SeparatorWithText>

                        <Button variant={'ghost'} asChild>
                            <RevealContentOnClick
                                trigger={'Enter new address'}
                                className="py-4"
                            >
                                <DeliveryAddressInput className={'py-3 px-1'} />
                            </RevealContentOnClick>
                        </Button>
                    </TabsContent>

                    <TabsContent value="corporate" className="grid gap-3">
                        <SavedDeliveryDialog deliveries={savedDeliveries} />
                        {/* <SavedDelivery delivery={savedDeliveries[0]} /> */}

                        <SeparatorWithText className="mx-8">
                            Or
                        </SeparatorWithText>

                        <CorporateInput />
                        <Separator className="my-2" />
                        <DeliveryAddressInput />
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

const CorporateInput = () => {
    return (
        <>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="company-name">Company</Label>
                <Input id="company-name" placeholder="Name of company" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="country">Country</Label>
                {/* Select Country */}
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tin">TIN (Tax Identification Number)</Label>
                <Input id="tin" placeholder="TIN" />
            </div>
        </>
    )
}

export default DeliverySection
