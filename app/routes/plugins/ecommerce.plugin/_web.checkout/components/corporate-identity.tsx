import { cn } from '~/lib/utils'

const CorporateIdentity = ({ className }: { className?: string }) => {
    return (
        <div className={cn('h-fit', className)}>
            <div className="bg-[url('/logos/webie-black-300.png')] dark:bg-[url('/logos/webie-white-300.png')] bg-cover bg-center w-20 h-5" />
        </div>
    )
}

export default CorporateIdentity
