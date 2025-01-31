'use server'
import { CartItem } from '@/types'
import { cookies } from 'next/headers'
import { auth } from '@/auth'
import { prisma } from '@/db/prisma'
import { convertToPlainObject } from '@/lib/utils'
import { crtItemValidator } from '@/lib/validator'

export const addItemToCart = async (item: CartItem) => {
	try {
		const sessionCrtId = (await cookies()).get('sessionCrtId')?.value
		const session = await auth()
		const userId = session?.user?.id ? (session.user.id as string) : null
		if (!sessionCrtId) throw new Error('Session not found')

		const cart = await getMyCrt()
		// console.log('addItemToCart__actions', cart)

		// Parse cart
		const parsedItem = crtItemValidator.parse(item)

		// Find item in DB
		const product = await prisma.product.findFirst({
			where: {
				id: item.productId,
			},
		})

		console.log(
			'\n\n<<<------->>>\n',
			'sessionCrtId>>>',
			sessionCrtId,
			'\nsession>>>',
			session,
			'\nuserId>>>',
			userId,
			'\nitem>>>',
			parsedItem,
			'\nproduct>>>',
			product
		)

		return {
			success: true,
			message: 'Item added to cart',
		}
	} catch (e) {
		console.log(e.message)
	}
}

export const getMyCrt = async () => {
	const sessionCrtId = (await cookies()).get('sessionCrtId')?.value
	if (!sessionCrtId) throw new Error('Session not found')

	const session = await auth()

	const userId = session?.user?.id ? (session.user.id as string) : null
	console.log('getMyCrt__userId>>>', userId)

	// Get user cart from DB
	const crt = await prisma.cart.findFirst({
		where: userId ? { userId } : { sessionCartId: sessionCrtId },
	})

	console.log('Get user cart from DB', crt)
	if (!crt) return undefined

	return convertToPlainObject({
		...crt,
		items: crt.items as CartItem[],
		itemsPrice: crt.itemsPrice.toString(),
		totalPrice: crt.totalPrice.toString(),
		shippingPrice: crt.shippingPrice.toString(),
		taxPrice: crt.taxPrice.toString(),
	})
}
