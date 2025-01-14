import React from 'react'
import { cn, validateFormatPrice } from '@/lib/utils'

function ProductPrice({ value, className }: { value: string; className?: string }) {
	// console.log('ProductPrice>>>', typeof validateFormatPrice(Number(value)))
	const price = validateFormatPrice(Number(value))
	const [int, decimal] = price.split('.')
	return (
		<p className={cn('text-2xl', className)}>
			<span className="align-super text-xs">$</span>
			{int}
			<span className="align-super text-xs">.{decimal}</span>
		</p>
	)
}

export default ProductPrice
