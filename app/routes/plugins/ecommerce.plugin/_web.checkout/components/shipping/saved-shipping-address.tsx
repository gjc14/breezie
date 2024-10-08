import { Home } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '~/components/ui/dialog'
import { cn } from '~/lib/utils'

/**
 * This should be wrapped by Dialog
 */
const SavedShippingAddress = ({
    address,
    className,
}: {
    address: any
    className?: string
}) => {
    // TODO: Set checkout state

    return (
        <DialogClose className="text-start">
            <Card className="">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                        Address Country
                    </CardTitle>
                    <Home className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">Address City</div>
                    <p className="text-xs text-muted-foreground">
                        Address address
                    </p>
                </CardContent>
            </Card>
        </DialogClose>
    )
}

const SavedShippingAddressDialog = ({
    address,
    className,
}: {
    address: any[]
    className?: string
}) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'outline'} className={cn('', className)}>
                    Choose saved address
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] max-w-[75vw] overflow-scroll">
                <DialogHeader>
                    <DialogTitle>Choose saved address</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <div className="grid grid-cols-1 gap-2 xs:grid-cols-2 lg:grid-cols-3">
                    {/* TODO: Render */}
                    <SavedShippingAddress address={{}} />
                    <SavedShippingAddress address={{}} />
                    <SavedShippingAddress address={{}} />
                    <SavedShippingAddress address={{}} />
                    <SavedShippingAddress address={{}} />
                    <SavedShippingAddress address={{}} />
                    <SavedShippingAddress address={{}} />
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default SavedShippingAddressDialog
