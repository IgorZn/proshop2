import React from 'react'
import { getBySlug } from '@/lib/actions/product.actions'
import { notFound } from 'next/navigation'
import ProductPrice from '@/components/shared/product/product-price'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import ProductImages from '@/components/shared/product/product-images'
import AddToCart from '@/components/shared/product/add-to-cart'
import { getMyCrt } from '@/lib/actions/cart.actions'
import { Cart } from '@/types'

async function ProductDetailPage({ params: { slug } }: { params: { slug: string } }) {
	const product = await getBySlug(slug)
	if (!product) return notFound()

	const cart: Cart = await getMyCrt()
	// console.log('ProductDetailPage>>>', product)
	return (
		<>
			<section>
				<div className="grid grid-cols-1 md:grid-cols-5">
					{/*	Images column */}
					<div className="col-span-2">
						<ProductImages images={product.images} />
					</div>
					<div className="col-span-2 p-5">
						<div className="flex flex-col gap-6">
							<p>
								{product.brand} {product.category}
							</p>
							<h1 className={'h3-bold'}>{product.name}</h1>
							<p>
								{product.rating} of {product.numReviews} Reviews
							</p>
							<div className="flex flex-col gap-3 sm:items-center md:flex-row">
								<ProductPrice value={product.price} className={'rounded-full bg-emerald-200 p-2 text-green-900'} />
							</div>
						</div>
						<div className="mt-10">
							<p className={'font-semibold'}>Description</p>
							<p>{product.description}</p>
						</div>
					</div>
					{/*	Action column*/}
					<div>
						<Card>
							<CardContent className={'p-4'}>
								<div className="mb-2 flex justify-between">
									<p>Price</p>
									<ProductPrice value={product.price} />
								</div>
								<div className="mb-2 flex justify-between">
									<p>Status</p>
									{product.stock > 0 ? <Badge>In Stock</Badge> : <Badge variant="destructive">Out of Stock</Badge>}
								</div>
								{product.stock > 0 && (
									<AddToCart
										cart={cart}
										item={{
											productId: product.id,
											name: product.name,
											slug: product.slug,
											price: product.price,
											qty: 1,
											image: product.images![0],
										}}
									/>
								)}
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</>
	)
}

export default ProductDetailPage
