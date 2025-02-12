import { z } from 'zod'
import { validateFormatPrice } from '@/lib/utils'

const currency = z
	.string()
	.refine(value => /^\d+(\.\d{2})?$/.test(validateFormatPrice(Number(value))), { message: 'Invalid price' })

export const insertProductSchema = z.object({
	name: z.string().min(3, { message: 'Product name must be at least 3 characters' }),
	slug: z.string().min(3, { message: 'Product slug must be at least 3 characters' }),
	category: z.string().min(3, { message: 'Product category must be at least 3 characters' }),
	description: z.string().min(3, { message: 'Product description must be at least 3 characters' }),
	images: z.array(z.string()).min(1, { message: 'Product images must be at least 1 image' }),
	price: currency,
	brand: z.string(),
	numReviews: z.coerce.number(),
	stock: z.coerce.number(),
	isFeatured: z.boolean(),
	banner: z.string(),
})

export const signInFormValidator = z.object({
	email: z.string().email('Invalid email'),
	password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

export const signUpFormValidator = signInFormValidator
	.extend({
		name: z.string().min(3, { message: 'Name must be at least 3 characters' }),
		confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' }),
	})
	.refine(data => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})

export const crtItemValidator = z.object({
	productId: z.string().min(1, { message: 'Product id must be at least 1 characters' }),
	name: z.string().min(1, { message: 'Product name must be at least 1 characters' }),
	slug: z.string().min(1, { message: 'Product slug must be at least 1 characters' }),
	image: z.string(),
	qty: z.coerce.number(),
	price: currency,
})

export const insertCrtValidator = z.object({
	items: z.array(crtItemValidator),
	itemsPrice: currency,
	totalPrice: currency,
	shippingPrice: currency,
	taxPrice: currency,
	sessionCartId: z.string().min(1, { message: 'Session cart id is required' }),
	userId: z.string().optional().nullable(),
})

export const shippingAddressValidator = z.object({
	fullName: z.string().min(3, { message: 'Full name is required' }),
	streetAddress: z.string().min(3, { message: 'Address is required' }),
	city: z.string().min(3, { message: 'City is required' }),
	postalCode: z.string().min(3, { message: 'Postal code is required' }),
	country: z.string().min(2, { message: 'Country is required' }),
	lat: z.number().optional(),
	lng: z.number().optional(),
})
