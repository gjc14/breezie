import { Minus, Plus } from 'lucide-react'
import { useEffect, useRef } from 'react'

/**
 * This is a number input component, displaying and returning a number value.
 * @param value value state
 */
export function NumberInput({
    value,
    onChange,
    minusFn,
    plusFn,
}: {
    value: number
    onChange?: (value: number) => void
    minusFn?: () => void
    plusFn?: () => void
}) {
    const valueRef = useRef<number>(value)

    // handle qty change
    const updateQty = (quantity: number | string) => {
        let newQuantity =
            typeof quantity === 'number'
                ? valueRef.current + quantity
                : parseInt(quantity, 10)

        // Validate input
        if (isNaN(newQuantity)) {
            console.log('Input is not a number')
            valueRef.current = 1
            onChange?.(valueRef.current)
        } else if (newQuantity < 1) {
            console.log('Input is less than 1')
            valueRef.current = 1
            onChange?.(valueRef.current)
        } else {
            valueRef.current = newQuantity
            onChange?.(valueRef.current)
        }
        // And other validation
    }

    useEffect(() => {
        valueRef.current = value
    }, [value])

    return (
        <div className="relative flex items-center w-24 h-8 gap-1">
            <button
                type="button"
                className="absolute h-full top-[50%] translate-y-[-50%] left-0 pl-2 focus:outline-none"
                onClick={() => {
                    updateQty(-1)
                    minusFn?.()
                }}
                aria-label="Decrease quantity"
            >
                <Minus width={16} height={16} />
            </button>
            <input
                type="text"
                title="Quantity"
                name="quantity"
                value={value}
                onChange={e => updateQty(e.target.value)}
                className="w-full h-full bg-primary-foreground text-center rounded-md border focus-visible:ring-2 focus-visible:ring-sky-600 focus:outline-none overflow-hidden"
            />
            <button
                type="button"
                className="absolute h-full top-[50%] translate-y-[-50%] right-0 pr-2 focus:outline-none"
                onClick={() => {
                    updateQty(1)
                    plusFn?.()
                }}
                aria-label="Increase quantity"
            >
                <Plus width={16} height={16} />
            </button>
        </div>
    )
}
