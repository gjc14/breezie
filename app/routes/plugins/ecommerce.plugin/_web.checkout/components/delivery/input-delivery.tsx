import { Checkbox } from '~/components/ui/checkbox'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { cn } from '~/lib/utils'

export const DeliveryAddressInput = ({ className }: { className?: string }) => {
    return (
        <div className={cn('w-full grid items-center gap-4', className)}>
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
