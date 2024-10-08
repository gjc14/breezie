import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '~/components/ui/card'
import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Separator } from '~/components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { cn } from '~/lib/utils'
import SavedShippingAddressDialog from './saved-shipping-address'

const Shipping = ({
    className,
    savedAddress,
}: {
    className?: string
    savedAddress: any[]
}) => {
    return (
        <Card className={cn('', className)}>
            <CardHeader>
                <CardTitle>Shipping</CardTitle>
                <CardDescription>
                    Choose your method and address
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="individual">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="individual">Individual</TabsTrigger>
                        <TabsTrigger value="corporate">Corporate</TabsTrigger>
                    </TabsList>

                    <TabsContent value="individual">
                        <div className="grid gap-3">
                            <SavedShippingAddressDialog
                                address={savedAddress}
                            />
                            <ShippingAddressInput />
                        </div>
                    </TabsContent>
                    <TabsContent value="corporate">
                        <div className="grid gap-3">
                            <SavedShippingAddressDialog
                                address={savedAddress}
                            />
                            <CorporateInput />
                            <Separator className="my-2" />
                            <ShippingAddressInput />
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    )
}

const ShippingAddressInput = () => {
    return (
        <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name of receiver" />
            </div>
            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="contact">Contact</Label>
                <Input id="contact" placeholder="Contact of receiver" />
            </div>

            {/* Administration department */}
            <div className="grid grid-cols-2 gap-1.5">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="country">Country</Label>
                    {/* Select Country */}
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="Taipei" />
                </div>
            </div>

            <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Input
                    id="address"
                    placeholder="7 floor No.100, Zhinan rd. Wenshan dist."
                />
            </div>

            <div className="flex items-center space-x-2">
                <Checkbox id="save-address" />
                <Label htmlFor="save-address">Save this address</Label>
            </div>
        </div>
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

export default Shipping
