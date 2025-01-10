import React from 'react'
import ProductCard from '@/components/shared/product/product-card'

function ProductList({ data, title, limit }: { data: unknown; title?: string; limit?: number }) {
	const limitProducts = limit ? data.products.slice(0, limit) : data.products

	return (
		<div className={'my-10'}>
			{title && <h2 className={'text-2xl font-bold'}>{title}</h2>}
			{data.products.length > 0 && (
				<div className={'grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4'}>
					{limitProducts.map((item: object) => {
						return (
							<div key={new Date().getTime()}>
								<ProductCard product={item} key={item.slug} />
							</div>
						)
					})}
				</div>
			)}
		</div>
	)
}

export default ProductList
