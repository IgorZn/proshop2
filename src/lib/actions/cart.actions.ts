'use server'
import { CartItem } from '@/types'
import { cookies } from 'next/headers'
import { auth } from '@/auth'
import { prisma } from '@/db/prisma'
import { convertToPlainObject } from '@/lib/utils'
import { crtItemValidator, insertCrtValidator } from '@/lib/validator'
import { roundTo2Decimals } from '@/utils/common'
import { revalidatePath } from 'next/cache'
import { Prisma } from '@prisma/client'

const calcPrice = (item: CartItem[]) => {
	console.log('calcPrice>>>', item)
	const itemsPrice = roundTo2Decimals(item.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0))
	const shippingPrice = roundTo2Decimals(itemsPrice > 100 ? 0 : 10)
	const taxPrice = roundTo2Decimals(itemsPrice * 0.15)
	const totalPrice = roundTo2Decimals(+itemsPrice + +shippingPrice + +taxPrice)

	console.log('totalPrice>>>', typeof totalPrice)
	console.log(
		'....calcPrice....',
		'\nitemsPrice',
		itemsPrice,
		'\nshippingPrice',
		shippingPrice,
		'\ntaxPrice',
		taxPrice,
		'\ntotalPrice',
		totalPrice
	)
	return { itemsPrice, shippingPrice, taxPrice, totalPrice }
}

export const addItemToCart = async (item: CartItem) => {
	console.log('addItemToCart>>>', item)
	try {
		const sessionCrtId = (await cookies()).get('sessionCrtId')?.value
		if (!sessionCrtId) throw new Error('Session not found')

		const session = await auth()
		const userId = session?.user?.id ? (session.user.id as string) : null

		const cart = await getMyCrt()
		console.log('addItemToCart__actions', cart)

		// Parse cart
		const parsedItem = crtItemValidator.parse(item)

		// Find item in DB
		const product = await prisma.product.findFirst({
			where: {
				id: item.productId,
			},
		})

		// console.log(
		// 	'\n\n<<<------->>>\n',
		// 	'sessionCrtId>>>',
		// 	sessionCrtId,
		// 	'\nsession>>>',
		// 	session,
		// 	'\nuserId>>>',
		// 	userId,
		// 	'\nitem>>>',
		// 	parsedItem,
		// 	'\nproduct>>>',
		// 	product
		// )

		if (!product) throw new Error('Product not found')

		// Add item to cart
		if (!cart) {
			const newCart = insertCrtValidator.parse({
				userId,
				sessionCartId: sessionCrtId,
				items: [item],
				...calcPrice([item]),
			})

			// Add item to cart in DB
			await prisma.cart.create({
				data: newCart,
			})

			//  revalidate product page
			revalidatePath(`/product/${product.slug}`)

			return {
				success: true,
				message: 'Item added to cart',
			}
		} else {
			const existItem = (cart.items as CartItem[]).find(item => item.productId === parsedItem.productId)

			if (existItem) {
				// Check stock
				if (product.stock < existItem.qty) {
					throw new Error('Product out of stock')
				}

				// Update item qty
				;(cart.items as CartItem[]).find(x => x.productId === parsedItem.productId)!.qty += parsedItem.qty
			} else {
				// If item not exist in cart, add it
				// Check stock
				if (product.stock < parsedItem.qty) {
					throw new Error('Product out of stock')
				}
				// Add item to cart
				cart.items.push(parsedItem)
			}

			// Update cart in DB
			await prisma.cart.update({
				where: {
					id: cart.id,
				},
				data: {
					items: cart.items as Prisma.CartUpdateitemsInput,
					...calcPrice(cart.items as CartItem[]),
				},
			})

			revalidatePath(`/product/${product.slug}`)

			return {
				success: true,
				message: `${product.name} added to cart`,
			}
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

	console.log('Get user cart from DB>>>', crt)
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

export const removeItemFromCart = async (productId: string) => {
	try {
		const sessionCrtId = (await cookies()).get('sessionCrtId')?.value
		if (!sessionCrtId) throw new Error('Session not found')

		// 	Get product from DB
		const product = await prisma.product.findFirst({
			where: {
				id: productId,
			},
		})

		if (!product) throw new Error('Product not found')

		// Get user cart from DB
		const crt = await getMyCrt()
		if (!crt) throw new Error('Cart not found')

		// 	Check if item exist in cart
		const existItem = (crt.items as CartItem[]).find(item => item.productId === productId)
		if (!existItem) throw new Error('Item not found')

		// 	If only one item in cart, delete cart
		if ((crt.items as CartItem[]).length === 1) {
			crt.items = (crt.items as CartItem[]).filter(item => item.productId !== productId)
		} else {
			// Decrease item qty
			;(crt.items as CartItem[]).find(x => x.productId === productId)!.qty -= 1

			// 	Update cart in DB
			await prisma.cart.update({
				where: {
					id: crt.id,
				},
				data: {
					items: crt.items as Prisma.CartUpdateitemsInput,
					...calcPrice(crt.items as CartItem[]),
				},
			})

			// 	Revalidate product page
			revalidatePath(`/product/${product.slug}`)

			return {
				success: true,
				message: `${product.name} removed from cart`,
			}
		}
	} catch (e) {
		console.log(e.message)
	}
}
