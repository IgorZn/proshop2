import React from 'react'
import CartTable from '@/app/(root)/cart/cart-table'
import { getMyCrt } from '@/lib/actions/cart.actions'

export const metadata = {
	title: 'Shopping Cart',
}
async function CartPage(props) {
	const cart = await getMyCrt()
	return (
		<div>
			<CartTable cart={cart} />
		</div>
	)
}

export default CartPage
