import { Button } from '@/components/ui/button'
import ProductList from '@/components/shared/product/product-list'
import { getProducts } from '@/utils/query'
import { Product } from '@/types'

export default async function Home() {
	const latestProduct: Product[] = await getProducts()

	return (
		<div>
			<Button variant="outline" className={'m-3'}>
				Button
			</Button>
			<ProductList data={latestProduct} />
		</div>
	)
}
