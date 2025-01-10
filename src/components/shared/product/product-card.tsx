import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Link from 'next/link'
import Image from 'next/image'
import ProductPrice from '@/components/shared/product/product-price'

function ProductCard({ product }: object) {
	return (
		<Card className={'w-full max-w-sm'}>
			<CardHeader className={'items-center p-0'}>
				<Link href={`/product/${product.slug}`} />
				<Image src={product.images[0]} alt={product.name} width={300} height={300} priority={true} />
			</CardHeader>
			<CardContent className={'grid gap-4 p-4'}>
				<div className="text-sm">{product.brand}</div>
				<Link href={`/product/${product.slug}`}>
					<h2 className="text-sm font-medium">{product.name}</h2>
				</Link>
				<div className="flex-between gap-4">
					<p>{product.rating} Stars</p>
					{product.stock > 0 ? (
						<ProductPrice value={product.price} />
					) : (
						<p className={'text-2xl font-light text-destructive'}>Out of Stock</p>
					)}
				</div>
			</CardContent>
		</Card>
	)
}

export default ProductCard
