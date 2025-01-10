import React from 'react'
import { cn } from '@/lib/utils'

function ProductPrice({ value, className }: { value: number; className?: string }) {
	const stringValue = value.toFixed(2)
	const [int, decimal] = stringValue.split('.')
	return (
		<p className={cn('text-2xl', className)}>
			<span className="align-super text-xs">$</span>
			{int}
			<span className="align-super text-xs">.{decimal}</span>
		</p>
	)
}

export default ProductPrice
