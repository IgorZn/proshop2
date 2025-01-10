import { Button } from '@/components/ui/button'
import '@/app/globals.css'
import sampleData from '@/db/sample-data'
import ProductList from '@/components/shared/product/product-list'

export default function Home() {
	return (
		<div>
			<Button variant="outline" className={'m-3'}>
				Button
			</Button>
			<ProductList data={sampleData} limit={4} />
		</div>
	)
}
