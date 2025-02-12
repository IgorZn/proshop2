import React from 'react'
import { Metadata } from 'next'
import { getMyCrt } from '@/lib/actions/cart.actions'
import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { getUserById } from '@/lib/actions/user.actions'
import ShippingAddressForm from '@/app/(root)/shipping-address/shipping-address-form'
import { ShippingAddress } from '@/types'

export const metadata: Metadata = {
	title: 'Shipping Address',
}

async function Page(props) {
	const cart = await getMyCrt()

	// Это надо перепроверить, т.к. cart.items.length === 0 -- всегда будет false
	// т.к. сама корзина не пустая, просто в ней будет 0 позиций, проще говоря товаров.
	if (!cart || cart.items.length === 0) redirect('/cart')

	const session = await auth()
	const userId = session?.user?.id
	if (!userId) redirect('/sign-in')
	const user = await getUserById(userId)
	console.log('shipping-address__user', user)

	return (
		<>
			<ShippingAddressForm address={user.address as ShippingAddress} />
		</>
	)
}

export default Page
